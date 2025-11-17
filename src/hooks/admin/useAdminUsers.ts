import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { AdminService } from '../../api/AdminService/AdminService';
import type {
  GetUsersResponse,
  UsersQuery,
  UpdateUsersRequest,
  UpdateUsersResponse,
  DeleteUsersRequest,
  DeleteUsersResponse,
  UserListItem,
} from '../../api/AdminService/admin.schemas';

export const queryKeys = {
  users: (query?: UsersQuery) => ['admin', 'users', query] as const,
  userById: (userId: string) => ['admin', 'user', userId] as const,
};

export const useGetUsers = (query: UsersQuery = {}): UseQueryResult<GetUsersResponse> => {
  return useQuery({
    queryKey: queryKeys.users(query),
    queryFn: () => AdminService.getUsers(query),
  });
};

export const useGetUserById = (
  userId: string,
  enabled: boolean = true
): UseQueryResult<UserListItem> => {
  return useQuery({
    queryKey: queryKeys.userById(userId),
    queryFn: () => AdminService.getUserById(userId),
    enabled: enabled && !!userId,
  });
};

export const useBlockUsers = (): UseMutationResult<
  UpdateUsersResponse,
  unknown,
  UpdateUsersRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminService.blockUsers,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useUnblockUsers = (): UseMutationResult<
  UpdateUsersResponse,
  unknown,
  UpdateUsersRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminService.unblockUsers,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const usePromoteUsers = (): UseMutationResult<
  UpdateUsersResponse,
  unknown,
  UpdateUsersRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminService.promoteUsers,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useDemoteUsers = (): UseMutationResult<
  UpdateUsersResponse,
  unknown,
  UpdateUsersRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminService.demoteUsers,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useDeleteUsers = (): UseMutationResult<
  DeleteUsersResponse,
  unknown,
  DeleteUsersRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminService.deleteUsers,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};
