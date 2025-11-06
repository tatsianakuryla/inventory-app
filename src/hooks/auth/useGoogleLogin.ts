import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService/AuthService';
import { useUserStore } from '../../stores/useUserStore';
import { queryKeys } from '../../queryClient/queryClient';
import type { AuthResponse } from '../../api/AuthService/auth.schemas';

export function useGoogleLogin(): UseMutationResult<AuthResponse, unknown, string> {
  const setAuth = useUserStore((state) => state.setAuth);
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, unknown, string>({
    mutationFn: (idToken) => AuthService.googleLogin(idToken),
    onSuccess: (data) => {
      setAuth(data);
      void queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
}
