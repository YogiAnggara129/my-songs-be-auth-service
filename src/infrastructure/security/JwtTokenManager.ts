import { StringValue } from 'ms';
import { ITokenManager } from '../../application/security/ITokenManager';
import jwt, { Algorithm } from 'jsonwebtoken';
import { AuthenticationError } from '../../core/exceptions/AuthenticationError';

export class JwtTokenManager implements ITokenManager {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpiresIn: StringValue;
  private readonly refreshTokenExpiresIn: StringValue;
  private readonly algorithm: Algorithm;

  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default-access-secret';
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret';
    this.accessTokenExpiresIn = (process.env.ACCESS_TOKEN_EXPIRES_IN || '15m') as StringValue;
    this.refreshTokenExpiresIn = (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d') as StringValue;
    this.algorithm = (process.env.JWT_ALGORITHM || 'HS256') as Algorithm;
  }

  async createAccessToken(payload: any): Promise<string> {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiresIn,
      algorithm: this.algorithm,
    });
  }

  async createRefreshToken(payload: any): Promise<string> {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiresIn,
      algorithm: this.algorithm,
    });
  }

  async verifyRefreshToken(token: string): Promise<void> {
    try {
      jwt.verify(token, this.refreshTokenSecret, { algorithms: [this.algorithm] });
    } catch (err) {
      throw new AuthenticationError('Invalid refresh token');
    }
  }
}
