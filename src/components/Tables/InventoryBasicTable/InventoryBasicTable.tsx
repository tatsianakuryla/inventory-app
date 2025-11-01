import type { Column } from '../createCommonColumns';
import type { JSX } from 'react';

interface InventoryBasicTableParameters<Row> {
  items: Row[];
  columns: Column<Row>[];
  getRowId: (row: Row) => string;
}

export function InventoriesBasicTable<Row>({
  items,
  columns,
  getRowId,
}: InventoryBasicTableParameters<Row>): JSX.Element {
  return (
    <div className="max-h-[700px] overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={[
                  'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400',
                  column.className ?? '',
                ].join(' ')}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {items.map((row) => (
            <tr
              key={getRowId(row)}
              className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={[
                    'whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300',
                    column.className ?? '',
                  ].join(' ')}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
