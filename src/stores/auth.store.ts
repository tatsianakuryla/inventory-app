import { create } from 'zustand';
import { LocalStorage } from '../storages/localStorage/LocalStorage';
import { SessionStorage } from '../storages/sessionStorage/SessionStorage';
import { USERS_ROUTES } from '../config/constants';

type AuthState = {
  accessToken: string | undefined;
  isLoggingOut: boolean;
};

type AuthActions = {
  setToken: (token: string | undefined) => void;
  setAuthError: (message?: string) => void;
  setReturnTo: (path?: string) => void;
  clearReturnTo: () => void;
  logout: (options?: { redirect?: boolean }) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  accessToken: LocalStorage.getToken() ?? undefined,

  isLoggingOut: false,

  setToken: (token: string | undefined) => {
    if (token) {
      LocalStorage.setToken(token);
    } else {
      LocalStorage.removeToken();
    }
    set({ accessToken: token ?? undefined });
  },

  setAuthError: (message?: string) => {
    if (message) {
      SessionStorage.setAuthError(message);
    } else {
      SessionStorage.removeErrorMessage();
    }
  },

  setReturnTo: (path?: string) => {
    const target = path || globalThis.location?.pathname + globalThis.location?.search || '/';
    SessionStorage.setReturnToLocation(target);
  },

  clearReturnTo: () => {
    SessionStorage.removeReturnToLocation?.();
  },

  logout: (options) => {
    if (get().isLoggingOut) return;
    set({ isLoggingOut: true });
    LocalStorage.removeToken();
    set({ accessToken: undefined });
    if (options?.redirect !== false) {
      globalThis.location.href = USERS_ROUTES.LOGIN;
    }
  },
}));
