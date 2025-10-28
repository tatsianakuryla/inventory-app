import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useOnAuthSuccess } from './useOnAuthSuccess';
import type { AuthResponse, LoginPayload } from '../../api/api.types';

export const useLogin = (): UseMutationResult<AuthResponse, unknown, LoginPayload> => {
  const handleAuthSuccess = useOnAuthSuccess();

  return useMutation<AuthResponse, unknown, LoginPayload>({
    mutationFn: AuthService.login,
    onSuccess: handleAuthSuccess,
  });
};
