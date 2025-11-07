import { type JSX } from 'react';
import { useGetPopularInventories } from '../../../../hooks/inventories/useInventories';
import { InventoriesTableSection } from '../InventoriesTableSection/InventoriesTableSection';
import type { AnyInventoryListItem } from '../inventory.mappers';

export function PopularInventoriesTable(): JSX.Element {
  const queryResult = useGetPopularInventories({ limit: 5 });

  return (
    <InventoriesTableSection<typeof queryResult.data, AnyInventoryListItem>
      queryResult={queryResult}
      selectItems={(data) => data?.items ?? []}
      emptyText="No popular inventories"
      errorTitle="Failed to load popular inventories"
    />
  );
}
