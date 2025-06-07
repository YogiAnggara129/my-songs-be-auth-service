import { Request, Response, NextFunction } from 'express';

const SENSITIVE_KEYS = ['password', 'token', 'accessToken', 'refreshToken', 'authorization'];

function censor(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;

  const clone: Record<string, any> = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (SENSITIVE_KEYS.includes(key.toLowerCase())) {
      clone[key] = '[SENSITIVE]';
    } else if (typeof obj[key] === 'object') {
      clone[key] = censor(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }
  return clone;
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const { method, originalUrl, headers, body } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${originalUrl}`);
  console.log('Headers:', censor(headers));

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    console.log('Body:', censor(body));
  }

  next();
}
