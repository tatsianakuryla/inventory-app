import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useAuthStore } from '../useAuthStore';
import { getGoogleIdToken } from '../../components/Auth/AuthSocialButton/helpers';
import { type AuthResponse } from '../../api/types/api.schemas';

export function useGoogleLogin(): UseMutationResult<AuthResponse, unknown, void> {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async () => {
      const idToken = await getGoogleIdToken();
      return AuthService.googleLogin(idToken);
    },
    onSuccess: (data) => {
      const { token, ...user } = data;
      setAuth(user, token);
    },
  });
}
