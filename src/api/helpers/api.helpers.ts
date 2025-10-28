import { isError } from '../../shared/typeguards/typeguards';
import {
  AUTH_MESSAGES,
  type AuthError,
  BACKEND_ERRORS,
} from '../../shared/constants/auth-messages';
import { APP_ROUTES } from '../../app-router/routes/routes';

export const toRejection = (error: unknown): Promise<never> =>
  Promise.reject(isError(error) ? error : new Error(String(error)));

export const onAuthPage = (): boolean => {
  const path = globalThis.location?.pathname ?? '';
  return path.startsWith(APP_ROUTES.LOGIN) || path.startsWith(APP_ROUTES.REGISTER);
};

export function extractMessage(
  body: { error?: string; message?: string } | undefined
): string | undefined {
  if (typeof body?.error === 'string' && body.error) return body.error;
  if (typeof body?.message === 'string' && body.message) return body.message;
  return undefined;
}

export function toAuthError(status: number, message?: string): AuthError | undefined {
  if (status === 403 && message === BACKEND_ERRORS.USER_BLOCKED) {
    return AUTH_MESSAGES.ACCOUNT_BLOCKED;
  }
  if (status === 410 || message === BACKEND_ERRORS.USER_DELETED) {
    return AUTH_MESSAGES.ACCOUNT_DELETED;
  }
  if (status === 401 && message === BACKEND_ERRORS.UNAUTHORIZED) {
    return AUTH_MESSAGES.ACCOUNT_DELETED;
  }
  if (
    status === 401 &&
    (message === BACKEND_ERRORS.UNAUTHENTICATED ||
      message === BACKEND_ERRORS.INVALID_TOKEN ||
      message === BACKEND_ERRORS.TOKEN_EXPIRED)
  ) {
    return AUTH_MESSAGES.SESSION_EXPIRED;
  }
  return undefined;
}
