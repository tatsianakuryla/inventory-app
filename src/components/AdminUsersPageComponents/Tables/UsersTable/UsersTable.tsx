import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import type { Column } from '../../../Tables/CreateCommonColumns';
import { SortableHeader, type SortOrder } from '../../../Tables/SortableHeader/SortableHeader';
import {
  type UserListItem,
  type SortableUserKeys,
} from '../../../../api/AdminService/admin.schemas';
import * as styles from './users-table.styles';

interface UsersTableParameters {
  users: UserListItem[];
  sortKey?: SortableUserKeys;
  sortOrder?: SortOrder;
  onSort?: (key: SortableUserKeys) => void;
  selectedIds?: Set<string>;
  onSelectAll?: (checked: boolean) => void;
  onSelectOne?: (id: string, checked: boolean) => void;
  isAllSelected?: boolean;
}

type UsersColumn = Omit<Column<UserListItem>, 'sortKey'> & {
  sortKey?: SortableUserKeys;
};

const getUserColumns = (): UsersColumn[] => [
  {
    key: 'name',
    header: 'Name',
    width: 'w-[20%]',
    cell: (user) => (
      <Link to={`/profile/${user.id}`} className={styles.nameLink}>
        {user.name}
      </Link>
    ),
    sortable: true,
    sortKey: 'name',
  },
  {
    key: 'email',
    header: 'Email',
    width: 'w-[25%]',
    cell: (user) => <span className={styles.textSecondary}>{user.email}</span>,
    sortable: true,
    sortKey: 'email',
  },
  {
    key: 'role',
    header: 'Role',
    width: 'w-[10%]',
    cell: (user) => (
      <span
        className={[
          styles.badgeBase,
          user.role === 'ADMIN' ? styles.badgeAdmin : styles.badgeUser,
        ].join(' ')}
      >
        {user.role}
      </span>
    ),
    sortable: true,
    sortKey: 'role',
  },
  {
    key: 'status',
    header: 'Status',
    width: 'w-[10%]',
    cell: (user) => (
      <span
        className={[
          styles.badgeBase,
          user.status === 'ACTIVE' ? styles.badgeActive : styles.badgeBlocked,
        ].join(' ')}
      >
        {user.status}
      </span>
    ),
    sortable: true,
    sortKey: 'status',
  },
  {
    key: 'authProvider',
    header: 'Auth Provider',
    width: 'w-[15%]',
    cell: (user) => {
      const providers: string[] = [];
      if (user.googleId) providers.push('Google');
      if (user.facebookId) providers.push('Facebook');
      if (providers.length === 0) providers.push('Email');
      return <span className={styles.textSecondary}>{providers.join(', ')}</span>;
    },
  },
  {
    key: 'createdAt',
    header: 'Created',
    width: 'w-[10%]',
    cell: (user) => (
      <span className={styles.textSecondary}>{new Date(user.createdAt).toLocaleDateString()}</span>
    ),
    sortable: true,
    sortKey: 'createdAt',
  },
  {
    key: 'updatedAt',
    header: 'Updated',
    width: 'w-[10%]',
    cell: (user) => (
      <span className={styles.textSecondary}>{new Date(user.updatedAt).toLocaleDateString()}</span>
    ),
    sortable: true,
    sortKey: 'updatedAt',
  },
];

export const UsersTable = ({
  users,
  sortKey,
  sortOrder,
  onSort,
  selectedIds,
  onSelectAll,
  onSelectOne,
  isAllSelected,
}: UsersTableParameters): JSX.Element => {
  const columns = getUserColumns();
  const hasSelection = !!selectedIds && !!onSelectAll && !!onSelectOne;

  return (
    <div className={styles.tableContainer} style={{ scrollbarGutter: 'stable' }}>
      <table className={styles.table}>
        <colgroup>
          {hasSelection && <col className={styles.checkboxColumn} />}
          {columns.map((column) => (
            <col key={column.key} className={column.width} />
          ))}
        </colgroup>

        <thead className={styles.thead}>
          <tr>
            {hasSelection && (
              <th scope="col" className={styles.th}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(event) => onSelectAll(event.target.checked)}
                  className={styles.checkbox}
                />
              </th>
            )}
            {columns.map((column) => {
              const showSortableHeader = !!column.sortable && !!column.sortKey && !!onSort;

              return (
                <th
                  key={column.key}
                  scope="col"
                  className={[styles.th, column.className ?? ''].join(' ')}
                >
                  {showSortableHeader ? (
                    <SortableHeader
                      label={typeof column.header === 'string' ? column.header : column.key}
                      isActive={sortKey === column.sortKey}
                      order={sortKey === column.sortKey ? sortOrder : undefined}
                      onClick={() => onSort(column.sortKey ?? 'name')}
                    />
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {users.map((user) => {
            const isSelected = selectedIds?.has(user.id);
            return (
              <tr
                key={user.id}
                className={[styles.trBase, isSelected ? styles.trSelected : styles.trDefault].join(
                  ' '
                )}
              >
                {hasSelection && (
                  <td className={styles.td}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(event) => onSelectOne(user.id, event.target.checked)}
                      className={styles.checkbox}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className={styles.td}>
                    {column.cell(user)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
