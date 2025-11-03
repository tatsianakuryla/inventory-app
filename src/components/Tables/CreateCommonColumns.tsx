import type { ReactNode } from 'react';
import { ItemsCountBadge } from './ItemsCountBadge/ItemsCountBadge';
import { InventoryNameCell } from './InventoryNameCell/InventoryNameCell';

export type Column<Row> = {
  key: string;
  header: string | ReactNode;
  className?: string;
  width?: string;
  cell: (row: Row) => ReactNode;
};

export type InventoryTableRows = {
  id: string;
  name: string;
  description: string | undefined;
  isPublic: boolean;
  owner: {
    name: string;
  };
  imageUrl: string | undefined;
  itemsCount?: number;
  createdAt: string;
};

export const INVENTORY_COLUMNS: Column<InventoryTableRows>[] = [
  ...createCommonColumns<InventoryTableRows>(),
];

function createCommonColumns<Row extends InventoryTableRows>(): Column<Row>[] {
  return [
    {
      key: 'name',
      header: 'Name',
      width: 'w-[30%]',
      cell: (row) => <InventoryNameCell row={row} />,
    },
    {
      key: 'description',
      header: 'Description',
      width: 'w-[30%]',
      cell: (row) => (
        <p className="line-clamp-2 text-left text-gray-600 dark:text-gray-400">
          {row.description || 'No description'}
        </p>
      ),
    },
    {
      key: 'visibility',
      header: 'Visibility',
      width: 'w-[10%]',
      cell: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            row.isPublic
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {row.isPublic ? 'Public' : 'Private'}
        </span>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      width: 'w-[10%]',
      cell: (row) => <ItemsCountBadge value={row.itemsCount ?? 0} />,
    },
    {
      key: 'creator',
      header: 'Creator',
      width: 'w-[15%]',
      cell: (row) => <span className="text-gray-600 dark:text-gray-400">{row.owner.name}</span>,
    },
    {
      key: 'createdAt',
      header: 'Created',
      width: 'w-[10%]',
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];
}
