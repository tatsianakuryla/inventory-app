import type { JSX } from 'react';
import { getTailWindClass } from '../../../../shared/helpers/helpers';
import type { Item } from '../../../../api/ItemsService/items.schemas';
import type { ColumnConfig } from './table-columns';
import { formatCell } from './cell-formatters';
import * as styles from './table.styles';

interface TableRowProperties {
  item: Item;
  columns: ColumnConfig[];
  canEdit: boolean;
  isSelected: boolean;
  onSelectOne: (id: string, checked: boolean) => void;
  onRowClick: (item: Item) => void;
}

export const TableRow = ({
  item,
  columns,
  canEdit,
  isSelected,
  onSelectOne,
  onRowClick,
}: TableRowProperties): JSX.Element => {
  const rowClassName = getTailWindClass(
    styles.rowBase,
    styles.rowClickable,
    isSelected ? styles.rowSelected : styles.rowNormal
  );

  return (
    <tr key={item.id} onClick={(): void => onRowClick(item)} className={rowClassName}>
      {canEdit && (
        <td className={styles.checkboxCell}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(event) => onSelectOne(item.id, event.target.checked)}
            onClick={(event) => event.stopPropagation()}
            className={styles.checkbox}
            aria-label="Select item"
          />
        </td>
      )}

      {columns.map((column) => (
        <td key={String(column.key)} className={styles.dataCell}>
          {formatCell(item, column.key, canEdit)}
        </td>
      ))}
    </tr>
  );
};
