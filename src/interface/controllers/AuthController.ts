import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';
import { LoginSchema } from '../../domain/entities/LoginEntity';
import { RegisterSchema } from '../../domain/entities/RegisterEntity';
import InvariantError from '../../core/exceptions/InvariantError';
import { inject, injectable } from 'inversify';
import { expressjwt, Request as JWTRequest } from 'express-jwt';
import TYPES from '../../infrastructure/types';

@injectable()
export class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parse = RegisterSchema.safeParse(req.body);
      if (!parse.success) {
        throw new InvariantError(parse.error?.issues[0].message ?? 'Invalid input data');
      }
      const user = await this.authService.register(parse.data);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parse = LoginSchema.safeParse(req.body);
      if (!parse.success) {
        throw new InvariantError(parse.error?.issues[0].message ?? 'Invalid input data');
      }
      const token = await this.authService.login(parse.data);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  };

  refreshToken = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.auth?.id;
      const token = req.body?.token;
      if (!token) {
        throw new InvariantError('Refresh token is required');
      }
      const newToken = await this.authService.refreshToken(id, token);
      res.json({ token: newToken });
    } catch (err) {
      next(err);
    }
  };

  getUser = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.auth?.id;
      if (!id) {
        throw new InvariantError('Token is required');
      }
      const user = await this.authService.getUser(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: JWTRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.auth?.id;
      if (!id) {
        throw new InvariantError('Token is required');
      }
      await this.authService.logout(req.auth?.id);
      res.status(204).send({
        message: 'Logged out successfully',
      });
    } catch (err) {
      next(err);
    }
  };
}
