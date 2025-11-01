import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import type { UpdateUserRequest, UpdateUserResponse } from '../../api/UserService/user.schemas';
import { UserService } from '../../api/UserService/UserService';
import { queryKeys } from '../../queryClient/queryClient';
import { useUserStore } from '../../stores/useUserStore';
import { applyTheme } from '../../shared/helpers/theme.helpers';

export const useUpdateUser = (): UseMutationResult<
  UpdateUserResponse,
  unknown,
  UpdateUserRequest
> => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => UserService.update(data),
    onMutate: async (variables) => {
      const previousUser = useUserStore.getState().user;
      if (variables.theme && previousUser) {
        setUser({ ...previousUser, theme: variables.theme });
        applyTheme(variables.theme);
      }
      await queryClient.cancelQueries({ queryKey: queryKeys.users });
      return { previousUser };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousUser) {
        setUser(context.previousUser);
        applyTheme(context.previousUser.theme);
      }
    },
    onSuccess: (data: UpdateUserResponse) => {
      setUser(data);
      applyTheme(data.theme);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};
