import { type JSX } from 'react';
import { useGetRecentInventories } from '../../../../hooks/inventories/useInventories';
import { InventoriesTableSection } from '../InventoriesTableSection/InventoriesTableSection';
import type { AnyInventoryListItem } from '../../../../shared/mappers/inventory.mappers';

export function RecentInventoriesTable(): JSX.Element {
  const queryResult = useGetRecentInventories({ limit: 5 });

  return (
    <InventoriesTableSection<typeof queryResult.data, AnyInventoryListItem>
      queryResult={queryResult}
      selectItems={(data) => data?.items ?? []}
      emptyText="No recent inventories"
      errorTitle="Failed to load recent inventories"
    />
  );
}
