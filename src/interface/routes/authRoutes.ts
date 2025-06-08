import 'reflect-metadata';
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import container from '../../infrastructure/container';
import TYPES from '../../infrastructure/types';

const router = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', authController.getUser);

export default router;
