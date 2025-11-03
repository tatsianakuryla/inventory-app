import type { ReactNode } from 'react';
import { ItemsCountBadge } from './ItemsCountBadge/ItemsCountBadge';
import { InventoryNameCell } from './InventoryNameCell/InventoryNameCell';

export type Column<Row> = {
  key: string;
  header: string | ReactNode;
  className?: string;
  cell: (row: Row) => ReactNode;
};

type CommonRowBase = {
  id: string;
  name: string;
  description: string | undefined;
  owner: {
    name: string;
  };
  imageUrl: string | undefined;
};

export type AllInventoryRow = CommonRowBase & {
  createdAt: string;
};

export type PopularInventoryRow = CommonRowBase & {
  itemsCount: number;
  createdAt: string;
};

export const ALL_INVENTORIES_COLUMNS: Column<AllInventoryRow>[] = [
  ...createCommonColumns<AllInventoryRow>(),
  {
    key: 'createdAt',
    header: 'Created',
    cell: (row) => (
      <span className="text-gray-600 dark:text-gray-400">
        {new Date(row.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

export const POPULAR_COLUMNS: Column<PopularInventoryRow>[] = [
  ...createCommonColumns<PopularInventoryRow>(),
  {
    key: 'items',
    header: 'Items',
    cell: (row) => <ItemsCountBadge value={row.itemsCount} />,
  },
];

function createCommonColumns<Row extends CommonRowBase>(): Column<Row>[] {
  return [
    {
      key: 'name',
      header: 'Name',
      cell: (row) => <InventoryNameCell row={row} />,
    },
    {
      key: 'description',
      header: 'Description',
      className: 'hidden md:table-cell',
      cell: (row) => (
        <p className="line-clamp-2 max-w-md text-gray-600 dark:text-gray-400">
          {row.description || 'No description'}
        </p>
      ),
    },
    {
      key: 'creator',
      header: 'Creator',
      className: 'hidden lg:table-cell',
      cell: (row) => <span className="text-gray-600 dark:text-gray-400">{row.owner.name}</span>,
    },
  ];
}
