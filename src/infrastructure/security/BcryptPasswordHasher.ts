import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { IPasswordHasher } from '../../application/security/IPasswordHasher';

export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
