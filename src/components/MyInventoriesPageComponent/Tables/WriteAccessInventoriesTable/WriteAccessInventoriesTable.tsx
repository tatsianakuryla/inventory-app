import { type JSX } from 'react';
import { LoadingErrorEmptySwitcher } from '../../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';
import { useGetMyWriteAccessInventories } from '../../../../hooks/inventories/useInventories';
import { InventoriesBasicTable } from '../../../Tables/InventoryBasicTable/InventoryBasicTable';
import { INVENTORY_COLUMNS } from '../../../Tables/CreateCommonColumns';

export const WriteAccessInventoriesTable = (): JSX.Element => {
  const { data, isLoading, error } = useGetMyWriteAccessInventories();

  return (
    <LoadingErrorEmptySwitcher isLoading={isLoading} error={error} data={data}>
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
