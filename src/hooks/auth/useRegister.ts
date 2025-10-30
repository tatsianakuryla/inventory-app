import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService/AuthService';
import { useOnAuthSuccess } from './useOnAuthSuccess';
import type { AuthResponse, RegisterPayload } from '../../api/AuthService/auth.schemas';

export const useRegister = (): UseMutationResult<AuthResponse, unknown, RegisterPayload> => {
  const onAuthSuccess = useOnAuthSuccess();

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: onAuthSuccess,
  });
};
