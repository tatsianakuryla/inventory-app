import { type JSX, useMemo } from 'react';
import { useGetPopularInventories } from '../../../../hooks/inventories/useInventories';
import { INVENTORY_COLUMNS, type InventoryTableRows } from '../../../Tables/CreateCommonColumns';
import { InventoriesBasicTable } from '../../../Tables/InventoriesBasicTable/InventoriesBasicTable';
import { LoadingErrorEmptySwitcher } from '../../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';

export function PopularInventoriesTable(): JSX.Element {
  const { data, isLoading, error } = useGetPopularInventories({ limit: 5 });

  const items: InventoryTableRows[] = useMemo(
    () =>
      (data?.items ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? undefined,
        isPublic: item.isPublic,
        owner: item.owner,
        imageUrl: item.imageUrl ?? undefined,
        itemsCount: item.itemsCount,
        createdAt: item.createdAt,
      })),
    [data?.items]
  );

  return (
    <LoadingErrorEmptySwitcher
      isLoading={isLoading}
      error={error}
      data={{ items }}
      emptyText="No inventories found"
      errorTitle="Failed to load inventories"
    >
      <InventoriesBasicTable items={items} columns={INVENTORY_COLUMNS} getRowId={(row) => row.id} />
    </LoadingErrorEmptySwitcher>
  );
}
