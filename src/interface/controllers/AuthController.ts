import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';
import { injectable } from 'tsyringe';

@injectable()
export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, role } = req.body;
      const user = await this.authService.register(email, password, role);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  };
}
