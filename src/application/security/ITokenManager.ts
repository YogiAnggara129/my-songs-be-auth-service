export interface ITokenManager {
  createRefreshToken(payload: any): Promise<string>;
  createAccessToken(payload: any): Promise<string>;
  verifyRefreshToken(token: string): Promise<void>;
}
