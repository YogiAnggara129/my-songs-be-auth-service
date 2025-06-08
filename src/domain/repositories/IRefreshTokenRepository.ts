import { RefreshTokenEntity } from '../entities/RefreshTokenEntity';

export interface IRefreshTokenRepository {
  findByToken(token: string): Promise<RefreshTokenEntity | null>;
  save(data: RefreshTokenEntity): Promise<RefreshTokenEntity>;
  revokeAllByUserId(userId: string): Promise<void>;
}
