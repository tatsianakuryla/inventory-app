import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '../../stores/useUserStore';
import type { AuthResponse } from '../../api/AuthService/auth.schemas';
import { queryKeys } from '../../queryClient/queryClient';

export const useOnAuthSuccess = (): ((data: AuthResponse) => void) => {
  const queryClient = useQueryClient();
  const setAuth = useUserStore((state) => state.setAuth);

  return useCallback(
    (data: AuthResponse) => {
      const { token, ...user } = data;
      setAuth(user, token);
      void queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
    [queryClient, setAuth]
  );
};
