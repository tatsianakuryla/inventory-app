import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useOnAuthSuccess } from './useOnAuthSuccess';
import type { AuthResponse, RegisterPayload } from '../../api/api.types';

export const useRegister = (): UseMutationResult<AuthResponse, unknown, RegisterPayload> => {
  const onAuthSuccess = useOnAuthSuccess();

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: onAuthSuccess,
  });
};
