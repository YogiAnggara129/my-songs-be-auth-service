import { IRefreshTokenRepository } from '../../../domain/repositories/IRefreshTokenRepository';
import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { RefreshToken } from '../models/RefreshToken';
import { RefreshTokenEntity } from '../../../domain/entities/RefreshTokenEntity';
import { injectable } from 'inversify';

@injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repo: Repository<RefreshToken>;

  constructor() {
    this.repo = AppDataSource.getRepository(RefreshToken);
  }

  async findByToken(token: string): Promise<RefreshTokenEntity | null> {
    return await this.repo.findOne({
      where: { token, isRevoked: false },
    });
  }

  async save(token: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    const data: RefreshToken = {
      userId: token.userId,
      token: token.token,
      createdAt: new Date(),
      isRevoked: false,
      revokedAt: null,
      replacedByToken: null,
    };
    return this.repo.save(data);
  }

  async revokeAllByUserId(userId: string): Promise<void> {
    await this.repo.update(
      { userId, isRevoked: false },
      { isRevoked: true, revokedAt: new Date() }
    );
  }
}
