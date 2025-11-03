import type { Column } from '../CreateCommonColumns';
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
    <div
      className="max-h-[700px] overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
      style={{ scrollbarGutter: 'stable' }}
    >
      <table className="w-full min-w-[900px] table-fixed divide-y divide-gray-200 dark:divide-gray-700">
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} className={column.width} />
          ))}
        </colgroup>
        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={[
                  'px-2 py-1.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400',
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
                    'px-2 py-1.5 text-left text-sm text-gray-700 dark:text-gray-300',
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
