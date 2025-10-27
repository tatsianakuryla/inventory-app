export const AUTH_MESSAGES = {
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  ACCOUNT_DELETED: 'Your account has been deleted',
  ACCOUNT_BLOCKED: 'Your account has been blocked',
  UNKNOWN: 'UNKNOWN',
} as const;

export type AuthMessageKey = keyof typeof AUTH_MESSAGES;

export type AuthError =
  | typeof AUTH_MESSAGES.SESSION_EXPIRED
  | typeof AUTH_MESSAGES.ACCOUNT_DELETED
  | typeof AUTH_MESSAGES.ACCOUNT_BLOCKED
  | typeof AUTH_MESSAGES.UNKNOWN;

export const BACKEND_ERRORS = {
  UNAUTHENTICATED: 'Unauthenticated',
  INVALID_TOKEN: 'Invalid token',
  TOKEN_EXPIRED: 'Token expired',
  USER_BLOCKED: 'User is blocked',
  USER_DELETED: 'User deleted',
  UNAUTHORIZED: 'Unauthorized',
} as const;
