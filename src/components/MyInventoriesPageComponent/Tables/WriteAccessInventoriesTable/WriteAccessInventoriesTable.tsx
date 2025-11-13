import { type JSX, useState, useMemo } from 'react';
import { LoadingErrorEmptySwitcher } from '../../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';
import { useGetMyWriteAccessInventories } from '../../../../hooks/inventories/useInventories';
import { InventoriesBasicTable } from '../../../Tables/InventoriesBasicTable/InventoriesBasicTable';
import { INVENTORY_COLUMNS, type InventoryTableRows } from '../../../Tables/CreateCommonColumns';
import type { SortOrder } from '../../../Tables/SortableHeader/SortableHeader';
import { Sorter } from '../../../../sorter/Sorter';
import { inventorySortAccessors } from '../../../Tables/InventorySortAccessors';
import { toInventoryTableRows } from '../../../../shared/mappers/inventory.mappers';

export const WriteAccessInventoriesTable = (): JSX.Element => {
  const [sortKey, setSortKey] = useState<string | undefined>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const { data, isLoading, error } = useGetMyWriteAccessInventories();

  const items: InventoryTableRows[] = useMemo(
    () => toInventoryTableRows(data?.items ?? []),
    [data?.items]
  );

  const sortedItems = useMemo(() => {
    if (!sortKey || !sortOrder) return items;
    const getComparableValue = inventorySortAccessors[sortKey];
    if (!getComparableValue) return items;

    const comparator = Sorter.createComparatorBy(getComparableValue, sortOrder);
    return [...items].toSorted((a, b) => {
      const result = comparator(a, b);
      return result === 0 ? a.id.localeCompare(b.id) : result;
    });
  }, [items, sortKey, sortOrder]);

  const handleSort = (key: string): void => {
    if (sortKey === key) {
      setSortOrder(Sorter.toggleSortOrder(sortOrder));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <LoadingErrorEmptySwitcher isLoading={isLoading} error={error} data={data}>
      {data?.items && (
        <InventoriesBasicTable
          items={sortedItems}
          columns={INVENTORY_COLUMNS}
          getRowId={(row) => row.id}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}
    </LoadingErrorEmptySwitcher>
  );
};
