import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useOnAuthSuccess } from './useOnAuthSuccess';
import type { AuthResponse } from '../../api/types/api.schemas';

export const useGoogleLogin = (): UseMutationResult<AuthResponse, unknown, string> => {
  const onAuthSuccess = useOnAuthSuccess();

  return useMutation({
    mutationFn: (idToken: string) => AuthService.googleLogin(idToken),
    onSuccess: onAuthSuccess,
  });
};
