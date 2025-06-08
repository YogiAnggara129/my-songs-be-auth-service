import 'reflect-metadata';
import { AuthenticationError } from '../../core/exceptions/AuthenticationError';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IPasswordHasher } from '../security/IPasswordHasher';
import { RegisterEntity } from '../../domain/entities/RegisterEntity';
import { ITokenManager } from '../security/ITokenManager';
import { LoginEntity } from '../../domain/entities/LoginEntity';
import TYPES from '../../infrastructure/types';
import { inject, injectable } from 'inversify';
import { RegisteredEntity } from '../../domain/entities/RegisteredEntity';
import { AuthEntity } from '../../domain/entities/AuthEntitiy';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IPasswordHasher) private passwordHasher: IPasswordHasher,
    @inject(TYPES.ITokenManager) private tokenManager: ITokenManager,
    @inject(TYPES.IRefreshTokenRepository) private refreshTokenRepo: IRefreshTokenRepository
  ) {}

  async register(data: RegisterEntity): Promise<RegisteredEntity> {
    const hashedPassword = await this.passwordHasher.hash(data.password);
    const userSaved = await this.userRepo.create({
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });
    return {
      id: userSaved.id,
      email: userSaved.email,
    };
  }

  async login(data: LoginEntity): Promise<AuthEntity> {
    const user = await this.userRepo.findAuthByEmail(data.email);
    if (!user) throw new AuthenticationError('Invalid credentials');

    const isPasswordValid = await this.passwordHasher.compare(data.password, user.password);
    if (!isPasswordValid) throw new AuthenticationError('Invalid credentials');

    const accessToken = await this.tokenManager.createAccessToken({
      id: user.userId,
      role: user.role,
    });
    const refreshToken = await this.tokenManager.createRefreshToken({
      id: user.userId,
      role: user.role,
    });

    await this.refreshTokenRepo.revokeAllByUserId(user.userId);
    await this.refreshTokenRepo.save({ token: refreshToken, userId: user.userId });

    return {
      accessToken,
      refreshToken,
    };
  }

  async getUser(id: string): Promise<RegisteredEntity> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new AuthenticationError('User not found');
    return {
      id: user.id,
      email: user.email,
    };
  }

  async refreshToken(id: string, token: string): Promise<AuthEntity> {
    const data = await this.refreshTokenRepo.findByToken(token);
    if (data?.userId !== id) throw new AuthenticationError('Invalid token');
    await this.tokenManager.verifyRefreshToken(token);

    const user = await this.userRepo.findById(id);
    if (!user) throw new AuthenticationError('User not found');

    const accessToken = await this.tokenManager.createAccessToken({
      id: id,
      role: user.role,
    });
    const newRefreshToken = await this.tokenManager.createRefreshToken({
      id: id,
      role: user.role,
    });

    await this.refreshTokenRepo.revokeAllByUserId(id);
    await this.refreshTokenRepo.save({ token: newRefreshToken, userId: id });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(id: string): Promise<void> {
    await this.refreshTokenRepo.revokeAllByUserId(id);
  }
}
