import { SESSION_STORAGE_KEYS } from './types';

export class SessionStorage {
  public static setAuthError(value: string): void {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.AUTH_ERROR, value);
  }

  public static getAuthError(): string | undefined {
    return sessionStorage.getItem(SESSION_STORAGE_KEYS.AUTH_ERROR) ?? undefined;
  }

  public static setReturnToLocation(value: string): void {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.RETURN_TO_LOCATION, value);
  }

  public static getReturnToLocation(): string | undefined {
    return sessionStorage.getItem(SESSION_STORAGE_KEYS.RETURN_TO_LOCATION) ?? undefined;
  }

  public static removeErrorMessage(): void {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.AUTH_ERROR);
  }

  public static removeReturnToLocation(): void {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.RETURN_TO_LOCATION);
  }
}
