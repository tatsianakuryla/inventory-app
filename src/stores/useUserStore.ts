/* eslint-disable unicorn/no-null */
import { create } from 'zustand';
import { APP_ROUTES } from '../appRouter/routes/routes';
import { AUTH_MESSAGES, type AuthError } from '../shared/constants/auth-messages';
import type { User } from '../api/UserService/user.schemas';

const TOKEN_KEY = 'auth_token';

type AuthState = {
  user: User | undefined;
  isAuthenticated: boolean;
  authError?: AuthError;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User | undefined) => void;
  clearAuth: () => void;
  setAuthError: (error?: AuthError) => void;
  logout: (options?: { redirect?: boolean }) => void;
  getToken: () => string | null;
};

const loadToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const saveToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save token:', error);
  }
};

const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};

export const useUserStore = create<AuthState>()((set, get) => {
  return {
    user: undefined,
    isAuthenticated: false,
    authError: undefined,
    token: loadToken(),

    setAuth: (user, token) => {
      saveToken(token);
      set({
        user,
        token,
        isAuthenticated: true,
        authError: undefined,
      });
    },

    setUser: (user) => {
      set({
        user,
        isAuthenticated: Boolean(user),
      });
    },

    clearAuth: () => {
      removeToken();
      set({
        user: undefined,
        token: null,
        isAuthenticated: false,
        authError: undefined,
      });
    },

    setAuthError: (error) => {
      if (error === AUTH_MESSAGES.SESSION_EXPIRED) {
        removeToken();
        set({
          user: undefined,
          token: null,
          isAuthenticated: false,
          authError: error,
        });
      } else {
        set({ authError: error });
      }
    },

    logout: (options) => {
      get().clearAuth();
      if (options?.redirect) {
        globalThis.window?.location?.replace(APP_ROUTES.HOME);
      }
    },

    getToken: () => get().token,
  };
});
