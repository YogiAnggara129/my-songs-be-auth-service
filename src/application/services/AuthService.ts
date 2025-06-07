import { UserEntity } from '../../domain/entities/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { v4 as uuidv4 } from 'uuid';
import { JwtProvider } from '../../infrastructure/security/JwtProvider';
import { injectable } from 'tsyringe';
import InvariantError from '../../core/exceptions/InvariantError';
import AuthenticationError from '../../core/exceptions/AuthenticationError';

@injectable()
export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  async register(email: string, password: string, role: 'user' | 'admin'): Promise<UserEntity> {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new InvariantError('Email already registered');

    const hashed = await PasswordHasher.hash(password);
    const user = new UserEntity(uuidv4(), email, hashed, role);
    await this.userRepo.save(user);
    return user;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new AuthenticationError('Invalid credentials');

    const valid = await user.checkPassword(password, PasswordHasher);
    if (!valid) throw new AuthenticationError('Invalid credentials');

    return JwtProvider.sign({ id: user.id, role: user.role });
  }
}
