import express from 'express';
import { requestLogger } from '../../interface/middlewares/logger';
import authRoutes from '../../interface/routes/authRoutes';
import errorHandler from '../../interface/middlewares/errorHandler';
import { AppDataSource } from '../db/data-source';

export async function createServer() {
  const app = express();

  app.use(express.json());

  app.use(requestLogger);

  app.use('/auth', authRoutes);

  app.use(errorHandler);

  await AppDataSource.initialize()
    .then(() => {
      console.log('Database connected');
      app.listen(process.env.SERVICE_PORT, () =>
        console.log(`Server started on http://localhost:${process.env.SERVICE_PORT}`)
      );
    })
    .catch((err) => console.error('DB connection failed:', err));
}
