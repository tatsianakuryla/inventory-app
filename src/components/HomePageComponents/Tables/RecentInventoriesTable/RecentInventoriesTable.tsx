import { type JSX } from 'react';
import { useGetRecentInventories } from '../../../../hooks/inventories/useInventories';
import { LoadingBlock } from '../../../Tables/LoadingBlock/LoadingBlock';
import { ErrorBlock } from '../../../Tables/ErrorBlock/ErrorBlock';
import { EmptyBlock } from '../../../Tables/EmptyBlock/EmptyBlock';
import { ALL_INVENTORIES_COLUMNS, type AllInventoryRow } from '../../../Tables/CreateCommonColumns';
import { InventoriesBasicTable } from '../../../Tables/InventoryBasicTable/InventoryBasicTable';

export function RecentInventoriesTable(): JSX.Element {
  const { data, isLoading, error } = useGetRecentInventories({ limit: 5 });

  if (isLoading) return <LoadingBlock />;
  if (error)
    return <ErrorBlock title="Failed to load recent inventories" message={error.message} />;
  if (!data?.items?.length) return <EmptyBlock text="No inventories found" />;

  const items: AllInventoryRow[] = data.items.map((items) => ({
    id: items.id,
    name: items.name,
    description: items.description ?? undefined,
    owner: items.owner,
    imageUrl: items.imageUrl ?? undefined,
    createdAt: items.createdAt,
  }));

  return (
    <InventoriesBasicTable
      items={items}
      columns={ALL_INVENTORIES_COLUMNS}
      getRowId={(row) => row.id}
    />
  );
}
