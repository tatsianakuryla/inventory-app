import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService/AuthService';
import { useCallback } from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../queryClient/queryClient';
import type { AuthResponse } from '../../api/AuthService/auth.schemas';

export function useFacebookLogin(): UseMutationResult<AuthResponse, unknown, string> {
  const setAuth = useUserStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  const onSuccess = useCallback(
    (data: AuthResponse) => {
      setAuth(data);
      void queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
    [queryClient, setAuth]
  );

  return useMutation({
    mutationFn: (accessToken: string) => AuthService.facebookLogin(accessToken),
    onSuccess,
  });
}
