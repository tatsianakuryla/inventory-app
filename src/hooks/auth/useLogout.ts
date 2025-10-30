import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService/AuthService';
import { useAuthStore } from '../../stores/useAuthStore';

export const useLogout = (): UseMutationResult<void, unknown, void> => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: AuthService.logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
    },
  });
};
