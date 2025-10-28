import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useOnAuthSuccess } from './useOnAuthSuccess';
import type { AuthResponse } from '../../api/api.types';

export const useFacebookLogin = (): UseMutationResult<AuthResponse, unknown, string> => {
  const onAuthSuccess = useOnAuthSuccess();

  return useMutation({
    mutationFn: (accessToken: string) => AuthService.facebookLogin(accessToken),
    onSuccess: onAuthSuccess,
  });
};
