import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../models/User';
import { AppDataSource } from '../data-source';
import { injectable } from 'inversify';
import { UserEntity } from '../../../domain/entities/UserEntity';
import { UserAuthEntity } from '../../../domain/entities/UserAuthEntity';

@injectable()
export class UserRepository implements IUserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.repo.create(user);
    const res = await this.repo.save(newUser);
    return {
      id: res.id,
      email: res.email,
      role: res.role,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    };
  }

  async findAuthByEmail(email: string): Promise<UserAuthEntity | null> {
    const res = await this.repo.findOne({ where: { email } });
    if (!res) return null;
    return {
      userId: res.id,
      email: res.email,
      role: res.role,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      password: res.password,
    };
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id } });
  }
}
