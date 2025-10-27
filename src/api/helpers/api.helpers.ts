import { isError } from '../../shared/typeguards/typeguards';

export const toRejection = (error: unknown): Promise<never> =>
  Promise.reject(isError(error) ? error : new Error(String(error)));

export const isCurrentPathOneOf = (paths: readonly string[]): boolean =>
  paths.includes(location.pathname);

export function extractMessage(
  body: { error?: string; message?: string } | undefined
): string | undefined {
  if (typeof body?.error === 'string' && body.error) return body.error;
  if (typeof body?.message === 'string' && body.message) return body.message;
  return undefined;
}

export function toAuthError(status: number, message?: string): string | undefined {
  if (status === 401 && message === 'User not found') return 'Your account has been deleted';
  if (status === 403 && message === 'User is blocked') return 'Your account has been blocked';
  if (status === 401) return 'Your session has expired. Please log in again.';
  return undefined;
}
