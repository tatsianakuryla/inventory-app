import type { JSX } from 'react';
import * as styles from './table.styles';

interface EmptyTableStateProperties {
  colSpan: number;
}

export const EmptyTableState = ({ colSpan }: EmptyTableStateProperties): JSX.Element => {
  return (
    <tr>
      <td colSpan={colSpan} className={styles.emptyCell}>
        <div className={styles.emptyContainer}>
          <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className={styles.emptyText}>No items found</p>
        </div>
      </td>
    </tr>
  );
};
