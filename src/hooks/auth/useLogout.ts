import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useAuthStore } from '../useAuthStore';

export const useLogout = (): UseMutationResult<void, unknown, void> => {
  const queryClient = useQueryClient();
  const doLogout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: AuthService.logout,
    onSettled: () => {
      doLogout({ redirect: true });
      queryClient.clear();
    },
  });
};
