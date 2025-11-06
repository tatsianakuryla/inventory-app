import { QueryClient } from '@tanstack/react-query';
import { stableStringify } from '../shared/helpers/helpers';

export const queryClient = new QueryClient();
export const queryKeys = {
  me: ['me'],
  users: ['users'],
  inventories: ['inventories'],
  inventoriesById: (id: string) => ['inventories', id],
  inventoriesAccess: (id: string) => ['inventories', id, 'access'],
  inventoriesStatistics: (id: string) => ['inventories', id, 'statistics'],
  popularInventories: ['inventories', 'popular'],
  recentInventories: ['inventories', 'recent'],
  myWriteAccessInventories: ['inventories', 'my-write-access'],
  categories: ['categories'],
  categoriesStats: ['categories', 'stats'],
  items: ['items'],
  itemsList: (inventoryId: string, parameters?: unknown) =>
    ['items', 'list', inventoryId, stableStringify(parameters)] as const,
  itemsById: (inventoryId: string, itemId: string) => ['items', inventoryId, itemId] as const,
} as const;
