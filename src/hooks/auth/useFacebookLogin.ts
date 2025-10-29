import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useCallback } from 'react';
import { useAuthStore } from '../useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../queryClient/queryClient';
import type { AuthResponse } from '../../api/types/api.schemas';

export function useFacebookLogin(): UseMutationResult<AuthResponse, unknown, string> {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  const onSuccess = useCallback(
    (data: AuthResponse) => {
      const { token, ...user } = data;
      setAuth(user, token);
      void queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
    [queryClient, setAuth]
  );

  return useMutation({
    mutationFn: (accessToken: string) => AuthService.facebookLogin(accessToken),
    onSuccess,
  });
}
