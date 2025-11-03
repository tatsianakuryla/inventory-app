import { type JSX } from 'react';
import { useGetInventories } from '../../../../hooks/inventories/useInventories';
import { INVENTORY_COLUMNS } from '../../../Tables/CreateCommonColumns';
import { InventoriesBasicTable } from '../../../Tables/InventoryBasicTable/InventoryBasicTable';
import { LoadingErrorEmptySwitcher } from '../../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';

export const AllInventoriesTable = (): JSX.Element => {
  const { data, isLoading, error } = useGetInventories();

  return (
    <LoadingErrorEmptySwitcher
      data={data}
      isLoading={isLoading}
      error={error}
      emptyText="No inventories found"
      errorTitle="Failed to load inventories"
    >
      {data?.items && (
        <InventoriesBasicTable
          items={data.items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description ?? undefined,
            isPublic: item.isPublic,
            owner: item.owner,
            imageUrl: item.imageUrl ?? undefined,
            createdAt: item.createdAt,
          }))}
          columns={INVENTORY_COLUMNS}
          getRowId={(row) => row.id}
        />
      )}
    </LoadingErrorEmptySwitcher>
  );
};
