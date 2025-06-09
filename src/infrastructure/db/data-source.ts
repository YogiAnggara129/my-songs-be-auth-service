import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as entities from './models';
import * as migrations from './migrations';

console.log('__dirname = ' + __dirname);
export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as 'postgres' | 'mysql' | 'sqlite') || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'auth_service',
  synchronize: process.env.DB_SYNC === 'true',
  logging: process.env.NODE_ENV !== 'production',
  entities: Object.values(entities),
  //   entities: [__dirname + '/infrastructure/db/models'],
  migrations: Object.values(migrations),
  //   migrations: [__dirname + '/infrastructure/db/migrations/**'],
});
