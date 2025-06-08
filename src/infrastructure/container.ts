import { Container } from 'inversify';
import TYPES from './types';

import { AuthService } from '../application/services/AuthService';
import { AuthController } from '../interface/controllers/AuthController';

import { IUserRepository } from '../domain/repositories/IUserRepository';

import { IPasswordHasher } from '../application/security/IPasswordHasher';
import { BcryptPasswordHasher } from './security/BcryptPasswordHasher';

import { ITokenManager } from '../application/security/ITokenManager';
import { JwtTokenManager } from './security/JwtTokenManager';
import { UserRepository } from './db/repositories/UserRepository';
import { IRefreshTokenRepository } from '../domain/repositories/IRefreshTokenRepository';
import { RefreshTokenRepository } from './db/repositories/RefreshTokenRepository';

const container = new Container();

container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IRefreshTokenRepository>(TYPES.IRefreshTokenRepository).to(RefreshTokenRepository);
container.bind<IPasswordHasher>(TYPES.IPasswordHasher).to(BcryptPasswordHasher);
container.bind<ITokenManager>(TYPES.ITokenManager).to(JwtTokenManager);

export default container;
