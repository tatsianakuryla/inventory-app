import { create } from 'zustand';
import { APP_ROUTES } from '../appRouter/routes/routes';
import { AUTH_MESSAGES, type AuthError } from '../shared/constants/auth-messages';
import type { User } from '../api/UserService/user.schemas';

type AuthState = {
  user: User | undefined;
  isAuthenticated: boolean;
  authError?: AuthError;
  setAuth: (user: User) => void;
  setUser: (user: User | undefined) => void;
  clearAuth: () => void;
  setAuthError: (error?: AuthError) => void;
  logout: (options?: { redirect?: boolean }) => void;
};

export const useUserStore = create<AuthState>()((set, get) => {
  return {
    user: undefined,
    isAuthenticated: false,
    authError: undefined,

    setAuth: (user) => {
      set({
        user,
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
      set({
        user: undefined,
        isAuthenticated: false,
        authError: undefined,
      });
    },

    setAuthError: (error) => {
      if (error === AUTH_MESSAGES.SESSION_EXPIRED) {
        set({
          user: undefined,
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
  };
});
