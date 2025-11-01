import { ACCESS_TOKEN_KEY, THEME_KEY } from './types';
import type { Theme } from '../../api/UserService/user.schemas';

export class LocalStorage {
  public static setToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  public static getToken(): string | undefined {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? undefined;
  }

  public static removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  public static setTheme(theme: Theme): void {
    localStorage.setItem(THEME_KEY, theme);
  }

  public static getTheme(): Theme | undefined {
    const result = localStorage.getItem(THEME_KEY);
    if (result === 'LIGHT' || result === 'DARK') return result;
    return undefined;
  }
}
