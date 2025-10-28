import { create } from 'zustand';
import { LocalStorage } from '../storages/localStorage/localStorage';
import { APP_ROUTES } from '../appRouter/routes/routes';
import { ACCESS_TOKEN_KEY } from '../storages/localStorage/types';
import { AUTH_MESSAGES, type AuthError } from '../shared/constants/auth-messages';
import type { User } from '../api/types/api.schemas';

type AuthState = {
  user: User | undefined;
  accessToken: string | undefined;
  isAuthenticated: boolean;
  authError?: AuthError;
  setAuth: (user: User, accessToken: string) => void;
  setUser: (user: User | undefined) => void;
  clearAuth: () => void;
  setAuthError: (error?: AuthError) => void;
  logout: (options?: { redirect?: boolean }) => void;
};

const initialToken = LocalStorage.getToken();
let storageListenerInstalled = false;

export const useAuthStore = create<AuthState>()((set, get) => {
  if (globalThis.window !== undefined && !storageListenerInstalled) {
    globalThis.addEventListener('storage', (event) => {
      if (event.key === null) {
        get().clearAuth();
        return;
      }
      if (event.key === ACCESS_TOKEN_KEY) {
        const token = LocalStorage.getToken();
        if (token) {
          set({ accessToken: token, isAuthenticated: true });
        } else {
          get().clearAuth();
        }
      }
    });
    storageListenerInstalled = true;
  }

  return {
    user: undefined,
    accessToken: initialToken,
    isAuthenticated: Boolean(initialToken),
    authError: undefined,

    setAuth: (user, accessToken) => {
      LocalStorage.setToken(accessToken);
      set({
        user,
        accessToken,
        isAuthenticated: true,
        authError: undefined,
      });
    },

    setUser: (user) => {
      set((state) => ({
        user,
        isAuthenticated: Boolean(state.accessToken),
      }));
    },

    clearAuth: () => {
      LocalStorage.removeToken();
      set({
        user: undefined,
        accessToken: undefined,
        isAuthenticated: false,
        authError: undefined,
      });
    },

    setAuthError: (error) => {
      if (error === AUTH_MESSAGES.SESSION_EXPIRED) {
        LocalStorage.removeToken();
        set({
          user: undefined,
          accessToken: undefined,
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
