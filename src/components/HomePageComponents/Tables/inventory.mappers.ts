import type { InventoryTableRows } from '../../Tables/CreateCommonColumns';

export type AnyInventoryListItem = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  isPublic: boolean;
  owner: { name: string };
  itemsCount?: number;
  createdAt: string;
};

export function toInventoryTableRows<T extends AnyInventoryListItem>(
  items: T[] = []
): InventoryTableRows[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? undefined,
    isPublic: item.isPublic,
    owner: item.owner,
    imageUrl: item.imageUrl ?? undefined,
    itemsCount: item.itemsCount,
    createdAt: item.createdAt,
  }));
}
