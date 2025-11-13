import { useMemo, useCallback, useState } from 'react';
import { useGetInventories } from './useInventories';
import type { SortOrder } from '../../components/Tables/SortableHeader/SortableHeader';
import { Sorter } from '../../sorter/Sorter';
import { inventorySortAccessors } from '../../components/Tables/InventorySortAccessors';
import { isServerSortableKey } from '../../shared/typeguards/typeguards';
import type { ServerSortableKey } from '../../shared/types/main.types';
import type { InventoryTableRows } from '../../components/Tables/CreateCommonColumns';
import type { InventoryListItem } from '../../api/InventoryService/inventory.schemas';
import type { Paginated } from '../../shared/types/schemas';
import { toInventoryTableRows } from '../../shared/mappers/inventory.mappers';

type Options = {
  initialSortKey?: string;
  initialSortOrder?: SortOrder;
  filterPredicate?: (item: InventoryListItem) => boolean;
};

export function useInventoriesTable({
  initialSortKey = 'createdAt',
  initialSortOrder = 'desc',
  filterPredicate,
}: Options = {}): {
  query: {
    data: Paginated<InventoryListItem> | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  view: {
    sortedItems: InventoryTableRows[];
    sortKey: string | undefined;
    sortOrder: SortOrder;
    handleSort: (key: string) => void;
  };
} {
  const [sortKey, setSortKey] = useState<string | undefined>(initialSortKey);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  const serverSortBy: ServerSortableKey | undefined = useMemo(
    () => (sortKey && isServerSortableKey(sortKey) ? sortKey : undefined),
    [sortKey]
  );

  const serverParameters = useMemo(() => {
    const order: 'asc' | 'desc' = sortOrder === 'asc' ? 'asc' : 'desc';
    const sortBy: ServerSortableKey = serverSortBy ?? 'createdAt';
    return { sortBy, order };
  }, [serverSortBy, sortOrder]);

  const { data, isLoading, error } = useGetInventories(serverParameters);

  const items: InventoryTableRows[] = useMemo(() => {
    const source = (data?.items ?? []).filter((index) =>
      filterPredicate ? filterPredicate(index) : true
    );
    return toInventoryTableRows(source);
  }, [data?.items, filterPredicate]);

  const sortedItems = useMemo(() => {
    if (serverSortBy || !sortKey || !sortOrder) return items;
    const getComparableValue = inventorySortAccessors[sortKey];
    if (!getComparableValue) return items;
    const comparator = Sorter.createComparatorBy(getComparableValue, sortOrder);
    return [...items].toSorted((a, b) => {
      const result = comparator(a, b);
      return result === 0 ? a.id.localeCompare(b.id) : result;
    });
  }, [items, sortKey, sortOrder, serverSortBy]);

  const handleSort = useCallback(
    (clickedKey: string): void => {
      if (sortKey === clickedKey) {
        setSortOrder((previous) => Sorter.toggleSortOrder(previous));
      } else {
        setSortKey(clickedKey);
        setSortOrder('asc');
      }
    },
    [sortKey]
  );

  return {
    query: { data, isLoading, error },
    view: { sortedItems, sortKey, sortOrder, handleSort },
  };
}
