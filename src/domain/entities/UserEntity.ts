export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    private passwordHash: string,
    public role: 'user' | 'admin'
  ) {}

  checkPassword(
    password: string,
    hasher: { compare: (plain: string, hash: string) => Promise<boolean> }
  ): Promise<boolean> {
    return hasher.compare(password, this.passwordHash);
  }
}
