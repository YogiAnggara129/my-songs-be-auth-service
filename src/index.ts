import 'reflect-metadata';
import 'dotenv/config';
import { createServer } from './infrastructure/http/createServer';

createServer();
