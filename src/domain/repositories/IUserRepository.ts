import { RegisterEntity } from '../entities/RegisterEntity';
import { UserAuthEntity } from '../entities/UserAuthEntity';
import { UserEntity } from '../entities/UserEntity';

export interface IUserRepository {
  create(user: Partial<RegisterEntity>): Promise<UserEntity>;
  findAuthByEmail(email: string): Promise<UserAuthEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}
