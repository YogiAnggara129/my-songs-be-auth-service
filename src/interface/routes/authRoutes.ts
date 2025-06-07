import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { AuthService } from '../../application/services/AuthService';

const router = Router();
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
