import { UserEntity } from '../entities/UserEntity';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<void>;
}
