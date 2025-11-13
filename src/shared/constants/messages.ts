export const AUTH_ERROR_MESSAGES = {
  LOGIN_FAILED: 'Login failed.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  EMAIL_ALREADY_REGISTERED: 'Email is already registered.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  ACCOUNT_DELETED: 'Your account has been deleted',
  ACCOUNT_BLOCKED: 'Your account has been blocked',
} as const;

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  NAME_TOO_LONG: 'Name is too long',
  PASSWORD_MIN: 'Min 6 characters',
  EMAIL_INVALID: 'Enter a valid email',
  CUSTOM_ID_REQUIRED: 'Custom ID is required',
  FIELD_REQUIRED: 'This field is required',
} as const;

export const BATCH_MESSAGES = {
  TOO_MANY_INVENTORIES_DELETE: 'Too many inventories to delete',
  TOO_MANY_INVENTORIES: 'Too many inventories',
  TOO_MANY_USERS_ACCESS: 'Too many users to update access',
  TOO_MANY_ITEMS: 'Too many items',
  EMPTY_PATCH: 'Empty patch',
} as const;

export const FORM_LABELS = {
  EMAIL: 'Email',
  PASSWORD: 'Password',
  NAME: 'Name',
  LANGUAGE: 'Language',
  THEME: 'Theme',
} as const;

export const FORM_PLACEHOLDERS = {
  EMAIL: 'you@example.com',
  PASSWORD: '••••••••',
  NAME: 'Your name',
} as const;

export const BUTTON_LABELS = {
  LOGIN: 'Log in',
  REGISTER: 'Register',
  SUBMIT: 'Submit',
  CANCEL: 'Cancel',
  SAVE: 'Save',
  DELETE: 'Delete',
  EDIT: 'Edit',
  CREATE: 'Create',
} as const;

export const BACKEND_ERRORS = {
  UNAUTHENTICATED: 'Unauthenticated',
  INVALID_TOKEN: 'Invalid token',
  TOKEN_EXPIRED: 'Token expired',
  UNAUTHORIZED: 'Unauthorized',
  USER_BLOCKED: 'User is blocked',
  USER_DELETED: 'User deleted',
  NOT_ADMIN: 'Not an admin',
} as const;
