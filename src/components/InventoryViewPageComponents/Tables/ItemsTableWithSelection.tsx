import type { JSX } from 'react';
import { useCallback, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import type { Item } from '../../../api/ItemsService/items.schemas';
import type { InventoryFields } from '../../../api/InventoryService/inventory.schemas';
import type { SortOrder } from '../../Tables/SortableHeader/SortableHeader';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { buildColumns } from './ItemsTableWithSelection/table-columns';
import { TableHeader } from './ItemsTableWithSelection/TableHeader';
import { TableRow } from './ItemsTableWithSelection/TableRow';
import { EmptyTableState } from './ItemsTableWithSelection/EmptyTableState';

interface ItemsTableWithSelectionProperties {
  items: Item[];
  selectedIds: Set<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string, checked: boolean) => void;
  isAllSelected: boolean;
  sortKey?: string;
  sortOrder?: SortOrder;
  onSort?: (key: string) => void;
  canEdit: boolean;
  inventoryFields?: InventoryFields | null;
}

export const ItemsTableWithSelection = ({
  items,
  selectedIds,
  onSelectAll,
  onSelectOne,
  isAllSelected,
  sortKey,
  sortOrder,
  onSort,
  canEdit,
  inventoryFields,
}: ItemsTableWithSelectionProperties): JSX.Element => {
  const navigate = useNavigate();

  const columns = useMemo(() => buildColumns(inventoryFields), [inventoryFields]);

  const handleRowClick = useCallback(
    (item: Item): void => {
      if (!canEdit) return;
      void navigate(
        generatePath(APP_ROUTES.ITEM_EDIT, {
          inventoryId: item.inventoryId,
          itemId: item.id,
        })
      );
    },
    [canEdit, navigate]
  );

  return (
    <div
      className="max-h-[700px] overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
      style={{ scrollbarGutter: 'stable' }}
    >
      <table className="w-full min-w-[900px] table-auto border-collapse">
        <colgroup>
          {canEdit && <col style={{ width: '50px' }} />}
          {columns.map((col) => (
            <col key={String(col.key)} style={{ width: col.width }} />
          ))}
        </colgroup>

        <TableHeader
          columns={columns}
          canEdit={canEdit}
          isAllSelected={isAllSelected}
          onSelectAll={onSelectAll}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={onSort}
        />

        <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {items.length === 0 ? (
            <EmptyTableState colSpan={canEdit ? columns.length + 1 : columns.length} />
          ) : (
            items.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                columns={columns}
                canEdit={canEdit}
                isSelected={selectedIds.has(item.id)}
                onSelectOne={onSelectOne}
                onRowClick={handleRowClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
