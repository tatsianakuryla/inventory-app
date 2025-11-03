import { type JSX } from 'react';
import { LoadingErrorEmptySwitcher } from '../../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';
import { useGetInventories } from '../../../../hooks/inventories/useInventories';
import { useUserStore } from '../../../../stores/useUserStore';
import { InventoriesBasicTable } from '../../../Tables/InventoryBasicTable/InventoryBasicTable';
import { INVENTORY_COLUMNS } from '../../../Tables/CreateCommonColumns';

export const MyInventoriesTable = (): JSX.Element => {
  const { data, isLoading, error } = useGetInventories();
  const user = useUserStore().user;
  return (
    <LoadingErrorEmptySwitcher isLoading={isLoading} error={error} data={data}>
      {data?.items && (
        <InventoriesBasicTable
          items={data.items
            .filter((item) => item.ownerId === user?.id)
            .map((item) => ({
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
