import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
  type QueryClient,
} from '@tanstack/react-query';
import { ItemsService } from '../../api/ItemsService/ItemsService';
import { queryKeys } from '../../queryClient/queryClient';
import type {
  Item,
  ItemListQuery,
  ItemRequest,
  ItemCreateRequest,
  ItemUpdateRequest,
  DeleteItemsRequest,
  DeleteItemsResponse,
} from '../../api/ItemsService/items.schemas';
import type { Id, Paginated } from '../../shared/types/schemas';

const itemsListPrefixKey = (inventoryId: string) => ['items', 'list', String(inventoryId)] as const;

const invalidateAllItemsLists = async (client: QueryClient, inventoryId: Id) => {
  await client.invalidateQueries({
    queryKey: itemsListPrefixKey(String(inventoryId)),
    exact: false,
  });
};

const invalidateItemDetail = async (client: QueryClient, inventoryId: Id, itemId: Id) => {
  await client.invalidateQueries({
    queryKey: queryKeys.itemsById(String(inventoryId), String(itemId)),
    exact: true,
  });
};

export const useGetAllItems = (
  inventoryId: Id,
  parameters?: ItemListQuery,
  options?: { enabled?: boolean }
): UseQueryResult<Paginated<Item>, Error> => {
  return useQuery({
    queryKey: queryKeys.itemsList(String(inventoryId), parameters),
    queryFn: () => ItemsService.getAll(inventoryId, parameters),
    enabled: options?.enabled !== false && Boolean(inventoryId),
  });
};

export const useGetItemById = (
  identifiers: ItemRequest,
  options?: { enabled?: boolean }
): UseQueryResult<Item, Error> => {
  return useQuery({
    queryKey: queryKeys.itemsById(identifiers.inventoryId, identifiers.itemId),
    queryFn: () => ItemsService.getOne(identifiers),
    enabled:
      options?.enabled !== false && Boolean(identifiers.inventoryId) && Boolean(identifiers.itemId),
  });
};

export const useCreateItem = (): UseMutationResult<
  Item,
  Error,
  { inventoryId: Id; item: ItemCreateRequest }
> => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ inventoryId, item }) => ItemsService.create(inventoryId, item),
    onSuccess: async (_, variables) => {
      await invalidateAllItemsLists(client, variables.inventoryId);
      await client.invalidateQueries({ queryKey: queryKeys.inventories });
    },
  });
};

export const useUpdateItem = (): UseMutationResult<
  Item,
  Error,
  { identifiers: ItemRequest; item: ItemUpdateRequest }
> => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ identifiers, item }) => ItemsService.update(identifiers, item),
    onSuccess: async (updated, { identifiers }) => {
      await invalidateItemDetail(client, identifiers.inventoryId, identifiers.itemId);
      await invalidateAllItemsLists(client, identifiers.inventoryId);
    },
  });
};

export const useDeleteItems = (): UseMutationResult<
  DeleteItemsResponse,
  Error,
  { inventoryId: Id; items: DeleteItemsRequest }
> => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ inventoryId, items }) => ItemsService.removeMany(inventoryId, items),
    onSuccess: async (response, variables) => {
      for (const deletedItemId of response.deletedIds) {
        client.removeQueries({
          queryKey: queryKeys.itemsById(String(variables.inventoryId), String(deletedItemId)),
          exact: true,
        });
      }
      await invalidateAllItemsLists(client, variables.inventoryId);
      await client.invalidateQueries({ queryKey: queryKeys.inventories });
    },
  });
};

export const useLikeItem = (): UseMutationResult<void, Error, ItemRequest> => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (identifiers) => ItemsService.like(identifiers),
    onSuccess: async (_, identifiers) => {
      await invalidateItemDetail(client, identifiers.inventoryId, identifiers.itemId);
      await invalidateAllItemsLists(client, identifiers.inventoryId);
    },
  });
};

export const useUnlikeItem = (): UseMutationResult<void, Error, ItemRequest> => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (identifiers) => ItemsService.unlike(identifiers),
    onSuccess: async (_, identifiers) => {
      await invalidateItemDetail(client, identifiers.inventoryId, identifiers.itemId);
      await invalidateAllItemsLists(client, identifiers.inventoryId);
    },
  });
};
