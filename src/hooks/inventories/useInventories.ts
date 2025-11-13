import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { InventoriesService } from '../../api/InventoryService/InventoryService';
import { queryKeys } from '../../queryClient/queryClient';
import type {
  InventoryListItem,
  InventoriesQuery,
  PopularInventoriesQuery,
  PopularInventoriesResponse,
  RecentInventoriesQuery,
  RecentInventoriesResponse,
  InventoryDetail,
  InventoryUpdateRequest,
  DeleteInventoriesBody,
  DeleteInventoriesResponse,
  InventoryAccessData,
  UpsertAccessBody,
  UpsertAccessResponse,
  RevokeAccessBody,
  RevokeAccessResponse,
  UpdateInventoryFieldsBody,
  UpdateInventoryFieldsResponse,
  UpdateIdFormatBody,
  InventoryIdFormat,
  InventoryStatistics,
  InventoryCreateRequestInput,
} from '../../api/InventoryService/inventory.schemas';
import type { Paginated } from '../../shared/types/schemas';
import { useUserStore } from '../../stores/useUserStore';
import { InventoryRoles, Roles, Statuses } from '../../shared/types/enums';

export const useGetInventories = (
  parameters?: InventoriesQuery,
  options?: { enabled?: boolean }
): UseQueryResult<Paginated<InventoryListItem>, Error> => {
  return useQuery({
    queryKey: [...queryKeys.inventories, parameters],
    queryFn: () => InventoriesService.getAll(parameters),
    enabled: options?.enabled,
  });
};

export const useGetPopularInventories = (
  parameters?: PopularInventoriesQuery,
  options?: { enabled?: boolean }
): UseQueryResult<PopularInventoriesResponse, Error> => {
  return useQuery({
    queryKey: [...queryKeys.popularInventories, parameters],
    queryFn: () => InventoriesService.getPopular(parameters),
    enabled: options?.enabled,
  });
};

export const useGetRecentInventories = (
  parameters?: RecentInventoriesQuery,
  options?: { enabled?: boolean }
): UseQueryResult<RecentInventoriesResponse, Error> => {
  return useQuery({
    queryKey: [...queryKeys.recentInventories, parameters],
    queryFn: () => InventoriesService.getRecent(parameters),
    enabled: options?.enabled,
  });
};

export const useGetMyWriteAccessInventories = (options?: {
  enabled?: boolean;
}): UseQueryResult<Paginated<InventoryListItem>, Error> => {
  return useQuery({
    queryKey: queryKeys.myWriteAccessInventories,
    queryFn: () => InventoriesService.getMyWriteAccessInventories(),
    enabled: options?.enabled,
  });
};

export const useCanEditInventory = (
  inventoryId: string,
  ownerId: string
): { canEdit: boolean; isLoading: boolean } => {
  const user = useUserStore((state) => state.user);
  const shouldCheckAccess = !!user && user.role !== Roles.ADMIN && user.id !== ownerId;
  const { data: accessData, isLoading } = useGetInventoryAccess(inventoryId, {
    enabled: shouldCheckAccess,
  });

  if (!user || user.status === Statuses.BLOCKED) return { canEdit: false, isLoading: false };

  const isAdmin = user.role === Roles.ADMIN;
  const isOwner = user.id === ownerId;
  if (isAdmin || isOwner) {
    return { canEdit: true, isLoading: false };
  }
  if (isLoading) return { canEdit: false, isLoading: true };
  const hasEditAccess = accessData?.some(
    (access) =>
      access.userId === user.id &&
      (access.inventoryRole === InventoryRoles.EDITOR ||
        access.inventoryRole === InventoryRoles.OWNER)
  );
  return { canEdit: !!hasEditAccess, isLoading: false };
};

export const useGetInventoryById = (
  inventoryId: string,
  options?: { enabled?: boolean }
): UseQueryResult<InventoryDetail, Error> => {
  return useQuery({
    queryKey: queryKeys.inventoriesById(inventoryId),
    queryFn: () => InventoriesService.getById(inventoryId),
    enabled: options?.enabled !== false && !!inventoryId,
  });
};

export const useGetInventoryAccess = (
  inventoryId: string,
  options?: { enabled?: boolean }
): UseQueryResult<InventoryAccessData, Error> => {
  return useQuery({
    queryKey: queryKeys.inventoriesAccess(inventoryId),
    queryFn: () => InventoriesService.getAccessData(inventoryId),
    enabled: options?.enabled !== false && !!inventoryId,
  });
};

export const useGetInventoryStatistics = (
  inventoryId: string,
  options?: { enabled?: boolean }
): UseQueryResult<InventoryStatistics, Error> => {
  return useQuery({
    queryKey: queryKeys.inventoriesStatistics(inventoryId),
    queryFn: () => InventoriesService.getStatistics(inventoryId),
    enabled: options?.enabled !== false && !!inventoryId,
  });
};

export const useCreateInventory = (): UseMutationResult<
  InventoryListItem,
  Error,
  InventoryCreateRequestInput
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: InventoriesService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.inventories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.popularInventories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.recentInventories });
    },
  });
};

export const useUpdateInventory = (): UseMutationResult<
  InventoryListItem,
  Error,
  { inventoryId: string; data: InventoryUpdateRequest }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryId, data }) => InventoriesService.update(inventoryId, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.inventories });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.inventoriesById(variables.inventoryId),
      });
      await queryClient.invalidateQueries({ queryKey: queryKeys.popularInventories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.recentInventories });
    },
  });
};

export const useDeleteInventories = (): UseMutationResult<
  DeleteInventoriesResponse,
  Error,
  DeleteInventoriesBody
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: InventoriesService.deleteMany,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.inventories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.popularInventories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.recentInventories });

      for (const id of response.deletedIds) {
        queryClient.removeQueries({ queryKey: queryKeys.inventoriesById(id) });
      }
    },
  });
};

export const useBulkUpdateVisibility = (): UseMutationResult<
  import('../../api/InventoryService/inventory.schemas').BulkUpdateVisibilityResponse,
  Error,
  import('../../api/InventoryService/inventory.schemas').BulkUpdateVisibilityBody
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: InventoriesService.bulkUpdateVisibility,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.inventories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.popularInventories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.recentInventories });

      for (const id of response.updatedIds) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.inventoriesById(id) });
      }
    },
  });
};

export const useUpdateInventoryAccess = (): UseMutationResult<
  UpsertAccessResponse,
  Error,
  { inventoryId: string; data: UpsertAccessBody }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryId, data }) => InventoriesService.updateAccess(inventoryId, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.inventoriesAccess(variables.inventoryId),
      });
    },
  });
};

export const useRevokeInventoryAccess = (): UseMutationResult<
  RevokeAccessResponse,
  Error,
  { inventoryId: string; data: RevokeAccessBody }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryId, data }) => InventoriesService.revokeAccess(inventoryId, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.inventoriesAccess(variables.inventoryId),
      });
    },
  });
};

export const useUpdateInventoryFields = (): UseMutationResult<
  UpdateInventoryFieldsResponse,
  Error,
  { inventoryId: string; data: UpdateInventoryFieldsBody }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryId, data }) => InventoriesService.updateFields(inventoryId, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.inventoriesById(variables.inventoryId),
      });
    },
  });
};

export const useUpdateInventoryIdFormat = (): UseMutationResult<
  InventoryIdFormat,
  Error,
  { inventoryId: string; data: UpdateIdFormatBody }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryId, data }) => InventoriesService.updateIdFormat(inventoryId, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.inventoriesById(variables.inventoryId),
      });
    },
  });
};
