import type { JSX } from 'react';
import type { SortOrder } from '../../../Tables/SortableHeader/SortableHeader';
import { SortableHeader } from '../../../Tables/SortableHeader/SortableHeader';
import type { ColumnConfig } from './table-columns';
import * as styles from './table.styles';

interface TableHeaderProperties {
  columns: ColumnConfig[];
  canEdit: boolean;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  sortKey?: string;
  sortOrder?: SortOrder;
  onSort?: (key: string) => void;
}

export const TableHeader = ({
  columns,
  canEdit,
  isAllSelected,
  onSelectAll,
  sortKey,
  sortOrder,
  onSort,
}: TableHeaderProperties): JSX.Element => {
  return (
    <thead className={styles.thead}>
      <tr>
        {canEdit && (
          <th className={styles.checkboxCell}>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(event) => onSelectAll(event.target.checked)}
              onClick={(event) => event.stopPropagation()}
              className={styles.checkbox}
              aria-label="Select all items"
            />
          </th>
        )}

        {columns.map((column) => (
          <th key={String(column.key)} scope="col" className={styles.headerCell}>
            {column.key === 'customId' && onSort ? (
              <SortableHeader
                label={column.label}
                isActive={sortKey === 'customId'}
                order={sortKey === 'customId' ? sortOrder : undefined}
                onClick={() => onSort('customId')}
              />
            ) : (
              column.label
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
