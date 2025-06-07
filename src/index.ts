import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import authRoutes from './interface/routes/authRoutes';
import ClientError from './core/exceptions/ClientError';
import errorHandler from './interface/middlewares/errorHandler';
import { requestLogger } from './interface/middlewares/logger';

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use('/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
