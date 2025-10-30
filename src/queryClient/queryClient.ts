import { QueryClient } from '@tanstack/react-query';

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
} as const;
