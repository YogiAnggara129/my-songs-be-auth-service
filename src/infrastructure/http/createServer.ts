import 'reflect-metadata';
import 'dotenv/config';
import { expressjwt } from 'express-jwt';

import express from 'express';
import { requestLogger } from '../../interface/middlewares/logger';
import authRoutes from '../../interface/routes/authRoutes';
import errorHandler from '../../interface/middlewares/errorHandler';
import { AppDataSource } from '../db/data-source';
import { Algorithm } from 'jsonwebtoken';

export async function createServer() {
  const app = express();

  app.use(
    expressjwt({
      secret: process.env.ACCESS_TOKEN_SECRET || 'default-access-secret',
      algorithms: [process.env.JWT_ALGORITHM || 'HS256'] as Algorithm[],
    }).unless({
      path: ['/auth/login', '/auth/register'],
    })
  );

  app.use(express.json());

  app.use(requestLogger);

  app.use('/auth', authRoutes);

  app.use(errorHandler);

  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected');
      app.listen(3000, () => console.log('Server started on http://localhost:3000'));
    })
    .catch((err) => console.error('DB connection failed:', err));
}
