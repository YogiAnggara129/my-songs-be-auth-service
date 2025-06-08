import { Request, Response, NextFunction } from 'express';
import { ClientError } from '../../core/exceptions/ClientError';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  if (err instanceof ClientError) {
    console.error(`[Client Error] ${err.name}: ${err.message}`);
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof Error && err.name === 'UnauthorizedError') {
    console.error(`${err.name}: ${err.message}`);
    res.status(401).json({ error: err.message });
  } else {
    console.error(`Server Error: ${err.message}`);
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
