import type { InventoryTableRows } from './CreateCommonColumns';

export const inventorySortAccessors: Record<
  string,
  (row: InventoryTableRows) => string | number | boolean | bigint | Date | null | undefined
> = {
  name: (row) => row.name.toLowerCase(),
  isPublic: (row) => (row.isPublic ? 1 : 0),
  itemsCount: (row) => row.itemsCount ?? 0,
  owner: (row) => row.owner.name.toLowerCase(),
  createdAt: (row) => new Date(row.createdAt),
};
