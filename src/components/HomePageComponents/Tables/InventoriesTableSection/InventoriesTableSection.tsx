import { type JSX, useMemo } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { INVENTORY_COLUMNS, type InventoryTableRows } from '../../../Tables/CreateCommonColumns';
import { InventoriesBasicTable } from '../../../Tables/InventoriesBasicTable/InventoriesBasicTable';
import { LoadingErrorEmptySwitcher } from '../../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';
import {
  type AnyInventoryListItem,
  toInventoryTableRows,
} from '../../../../shared/mappers/inventory.mappers';

type InventoriesTableSectionProperties<TData, TItem extends AnyInventoryListItem> = {
  queryResult: UseQueryResult<TData, Error>;
  selectItems: (data: TData | undefined) => TItem[];
  emptyText?: string;
  errorTitle?: string;
};

export function InventoriesTableSection<TData, TItem extends AnyInventoryListItem>({
  queryResult,
  selectItems,
  emptyText = 'No inventories found',
  errorTitle = 'Failed to load inventories',
}: InventoriesTableSectionProperties<TData, TItem>): JSX.Element {
  const { data, isLoading, error } = queryResult;

  const rows: InventoryTableRows[] = useMemo(
    () => toInventoryTableRows(selectItems(data)),
    [data, selectItems]
  );

  return (
    <LoadingErrorEmptySwitcher
      isLoading={isLoading}
      error={error}
      data={{ items: rows }}
      emptyText={emptyText}
      errorTitle={errorTitle}
    >
      <InventoriesBasicTable items={rows} columns={INVENTORY_COLUMNS} getRowId={(r) => r.id} />
    </LoadingErrorEmptySwitcher>
  );
}
