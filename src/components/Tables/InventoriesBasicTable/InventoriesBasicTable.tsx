import type { Column } from '../CreateCommonColumns';
import type { JSX } from 'react';
import { SortableHeader, type SortOrder } from '../SortableHeader/SortableHeader';

interface InventoryBasicTableParameters<Row> {
  items: Row[];
  columns: Column<Row>[];
  getRowId: (row: Row) => string;
  sortKey?: string;
  sortOrder?: SortOrder;
  onSort?: (key: string) => void;
  selectedIds?: Set<string>;
  onSelectAll?: (checked: boolean) => void;
  onSelectOne?: (id: string, checked: boolean) => void;
  isAllSelected?: boolean;
}

export function InventoriesBasicTable<Row>({
  items,
  columns,
  getRowId,
  sortKey,
  sortOrder,
  onSort,
  selectedIds,
  onSelectAll,
  onSelectOne,
  isAllSelected,
}: InventoryBasicTableParameters<Row>): JSX.Element {
  const hasSelection = !!selectedIds && !!onSelectAll && !!onSelectOne;
  return (
    <div
      className="max-h-[700px] overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-900"
      style={{ scrollbarGutter: 'stable' }}
    >
      <table className="w-full min-w-[900px] table-fixed divide-y divide-gray-200 dark:divide-gray-700">
        <colgroup>
          {hasSelection && <col className="w-[50px]" />}
          {columns.map((column) => (
            <col key={column.key} className={column.width} />
          ))}
        </colgroup>

        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
          <tr>
            {hasSelection && (
              <th
                scope="col"
                className="px-2 py-1.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(event) => onSelectAll(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800"
                />
              </th>
            )}
            {columns.map((column) => {
              const showSortableHeader = !!column.sortable && !!column.sortKey && !!onSort;

              return (
                <th
                  key={column.key}
                  scope="col"
                  className={[
                    'textClass-left textClass-xs textClass-gray-500 dark:textClass-gray-400 px-2 py-1.5 font-medium uppercase tracking-wider',
                    column.className ?? '',
                  ].join(' ')}
                >
                  {showSortableHeader ? (
                    <SortableHeader
                      label={typeof column.header === 'string' ? column.header : column.key}
                      isActive={sortKey === column.sortKey}
                      order={sortKey === column.sortKey ? sortOrder : undefined}
                      onClick={() => onSort(column.sortKey ?? 'createdAt')}
                    />
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900/40">
          {items.map((row) => {
            const rowId = getRowId(row);
            const isSelected = selectedIds?.has(rowId);
            return (
              <tr
                key={rowId}
                className={`transition-colors ${
                  isSelected
                    ? 'bg-teal-50 dark:bg-teal-900/20'
                    : 'odd:bg-white even:bg-gray-50 focus-within:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800/60 dark:even:bg-gray-800/40 dark:focus-within:bg-gray-700/60 dark:hover:bg-gray-700/60'
                }`}
              >
                {hasSelection && (
                  <td className="px-2 py-1.5 text-left text-sm">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(event) => onSelectOne(rowId, event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-2 py-1.5 text-left text-sm text-gray-800 dark:text-gray-200"
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
