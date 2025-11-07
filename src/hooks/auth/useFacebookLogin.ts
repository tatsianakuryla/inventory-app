import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService/AuthService';
import { useCallback } from 'react';
import { useUserStore } from '../../stores/useUserStore';
import type { AuthResponse } from '../../api/AuthService/auth.schemas';

export function useFacebookLogin(): UseMutationResult<AuthResponse, unknown, string> {
  const setAuth = useUserStore((state) => state.setAuth);

  const onSuccess = useCallback(
    (data: AuthResponse) => {
      const { token, ...user } = data;
      setAuth(user, token);
    },
    [setAuth]
  );

  return useMutation({
    mutationFn: (accessToken: string) => AuthService.facebookLogin(accessToken),
    onSuccess,
  });
}
