import { type JSX } from 'react';
import { useGetPopularInventories } from '../../../../hooks/inventories/useInventories';
import { EmptyBlock } from '../../../Tables/EmptyBlock/EmptyBlock';
import { LoadingBlock } from '../../../Tables/LoadingBlock/LoadingBlock';
import { POPULAR_COLUMNS, type PopularInventoryRow } from '../../../Tables/createCommonColumns';
import { ErrorBlock } from '../../../Tables/ErrorBlock/ErrorBlock';
import { InventoriesBasicTable } from '../../../Tables/InventoryBasicTable/InventoryBasicTable';

export function PopularInventoriesTable(): JSX.Element {
  const { data, isLoading, error } = useGetPopularInventories({ limit: 5 });

  if (isLoading) return <LoadingBlock />;
  if (error)
    return <ErrorBlock title="Failed to load popular inventories" message={error.message} />;
  if (!data?.items?.length) return <EmptyBlock text="No inventories found" />;

  const items: PopularInventoryRow[] = data.items.map((items) => ({
    id: items.id,
    name: items.name,
    description: items.description ?? undefined,
    ownerId: items.ownerId,
    imageUrl: items.imageUrl ?? undefined,
    createdAt: items.createdAt,
    itemsCount: items.itemsCount,
  }));

  return (
    <InventoriesBasicTable items={items} columns={POPULAR_COLUMNS} getRowId={(row) => row.id} />
  );
}
