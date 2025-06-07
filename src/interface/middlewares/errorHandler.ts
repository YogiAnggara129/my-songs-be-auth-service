import { Request, Response, NextFunction } from 'express';
import ClientError from '../../core/exceptions/ClientError';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  if (err instanceof ClientError) {
    console.error(`Client Error: ${err.message}`);
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(`Server Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
