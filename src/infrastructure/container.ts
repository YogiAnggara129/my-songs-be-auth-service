// config/di-container.ts
import { UserRepository } from './repositories/UserRepository';
import { AuthService } from '../application/services/AuthService';
import { AuthController } from '../interface/controllers/AuthController';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export const di = {
  userRepository,
  authService,
  authController,
};
