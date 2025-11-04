import { type JSX } from 'react';
import { useUserStore } from '../../../../stores/useUserStore';
import { LoadingErrorEmptySwitcher } from '../../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';
import { InventoriesBasicTable } from '../../../Tables/InventoriesBasicTable/InventoriesBasicTable';
import { INVENTORY_COLUMNS } from '../../../Tables/CreateCommonColumns';
import { useInventoriesTable } from '../../../../hooks/inventories/useInventoriesTable';

export const MyInventoriesTable = (): JSX.Element => {
  const userId = useUserStore().user?.id;
  const { query, view } = useInventoriesTable({
    filterPredicate: (item) => (userId ? item.ownerId === userId : false),
  });

  return (
    <LoadingErrorEmptySwitcher isLoading={query.isLoading} error={query.error} data={query.data}>
      {query.data?.items && (
        <InventoriesBasicTable
          items={view.sortedItems}
          columns={INVENTORY_COLUMNS}
          getRowId={(row) => row.id}
          sortKey={view.sortKey}
          sortOrder={view.sortOrder}
          onSort={view.handleSort}
        />
      )}
    </LoadingErrorEmptySwitcher>
  );
};
