const TYPES = {
  AuthService: Symbol.for('AuthService'),
  AuthController: Symbol.for('AuthController'),
  IUserRepository: Symbol.for('IUserRepository'),
  IPasswordHasher: Symbol.for('IPasswordHasher'),
  ITokenManager: Symbol.for('ITokenManager'),
  IRefreshTokenRepository: Symbol.for('IRefreshTokenRepository'),
};

export default TYPES;
