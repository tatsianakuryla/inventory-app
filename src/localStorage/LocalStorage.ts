import { ACCESS_TOKEN_KEY } from './types';

export class LocalStorage {
  public static setToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  public static getToken(): string | undefined {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? undefined;
  }

  public static removeToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
