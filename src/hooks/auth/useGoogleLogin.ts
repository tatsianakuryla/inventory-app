import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useAuthStore } from '../useAuthStore';
import { queryKeys } from '../../queryClient/queryClient';
import type { AuthResponse } from '../../api/types/api.schemas';

export function useGoogleLogin(): UseMutationResult<AuthResponse, unknown, string> {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, unknown, string>({
    mutationFn: (idToken) => AuthService.googleLogin(idToken),
    onSuccess: ({ token, ...user }) => {
      setAuth(user, token);
      void queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
}
