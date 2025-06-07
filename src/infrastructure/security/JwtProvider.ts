import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class JwtProvider {
  static sign(payload: object, expiresIn: number = 1000): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }

  static verify(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }
}
