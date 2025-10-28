import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../useAuthStore';
import { queryKeys } from '../../query-client/queryKeys';
import type { AuthResponse } from '../../api/api.types';

export const useOnAuthSuccess = (): ((data: AuthResponse) => void) => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useCallback(
    (data: AuthResponse) => {
      const { token, ...user } = data;
      setAuth(user, token);
      void queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
    [queryClient, setAuth]
  );
};
