import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../shared/types/main.types';

interface AuthState {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (_set, _get) => ({
      user: undefined,
      token: undefined,
      isAuthenticated: false,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
