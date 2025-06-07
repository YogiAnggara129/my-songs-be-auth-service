import { injectable } from 'tsyringe';
import { UserEntity } from '../../domain/entities/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

const users: UserEntity[] = [];

@injectable<IUserRepository>()
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    return users.find((u) => u.email === email) || null;
  }

  async save(user: UserEntity): Promise<void> {
    const index = users.findIndex((u) => u.id === user.id);
    if (index >= 0) users[index] = user;
    else users.push(user);
  }
}
