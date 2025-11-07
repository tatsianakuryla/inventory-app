import type { JSX } from 'react';
import { useCallback, useMemo } from 'react';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import type { Item } from '../../../api/ItemsService/items.schemas';
import type { InventoryFields } from '../../../api/InventoryService/inventory.schemas';
import type { SortOrder } from '../../Tables/SortableHeader/SortableHeader';
import { SortableHeader } from '../../Tables/SortableHeader/SortableHeader';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { LikeButton } from '../../LikeButton/LikeButton';

type FieldKey =
  | 'text1'
  | 'text2'
  | 'text3'
  | 'long1'
  | 'long2'
  | 'long3'
  | 'num1'
  | 'num2'
  | 'num3'
  | 'link1'
  | 'link2'
  | 'link3'
  | 'bool1'
  | 'bool2'
  | 'bool3';

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

type ColumnConfig = {
  key: 'customId' | 'likes' | FieldKey;
  label: string;
  width?: string;
};

const ALL_FIELD_KEYS: readonly FieldKey[] = [
  'text1',
  'text2',
  'text3',
  'long1',
  'long2',
  'long3',
  'num1',
  'num2',
  'num3',
  'link1',
  'link2',
  'link3',
  'bool1',
  'bool2',
  'bool3',
] as const;

function getField<F extends keyof InventoryFields>(
  fields: InventoryFields | null | undefined,
  key: F
): unknown {
  return fields ? Reflect.get(fields, key) : undefined;
}

function getItemValue<K extends FieldKey>(item: Item, key: K): Item[K] {
  return item[key];
}

function buildColumns(inventoryFields?: InventoryFields | null): ColumnConfig[] {
  const columns: ColumnConfig[] = [
    { key: 'customId', label: 'ID', width: '12%' },
    { key: 'likes', label: 'Likes', width: '8%' },
  ];

  const hasConfiguredFields = ALL_FIELD_KEYS.some(
    (k) => getField(inventoryFields, `${k}State`) === 'SHOWN'
  );

  if (!hasConfiguredFields) {
    columns.push({ key: 'text1', label: 'Name', width: '80%' });
    return columns;
  }

  let visibleCount = 0;

  for (const fieldKey of ALL_FIELD_KEYS) {
    const state = getField(inventoryFields, `${fieldKey}State`);
    const showInTable = Boolean(getField(inventoryFields, `${fieldKey}ShowInTable`));
    const nameValue = getField(inventoryFields, `${fieldKey}Name`);
    const label =
      typeof nameValue === 'string' && nameValue.trim() ? nameValue : fieldKey.toUpperCase();

    if (state === 'SHOWN' && showInTable) {
      visibleCount += 1;
      columns.push({
        key: fieldKey,
        label,
        width: visibleCount <= 5 ? '20%' : '15%',
      });
    }
  }

  return columns;
}

function formatCell(
  item: Item,
  columnKey: ColumnConfig['key'],
  canEdit: boolean
): JSX.Element | string {
  if (columnKey === 'customId') {
    const destination = canEdit
      ? generatePath(APP_ROUTES.ITEM_EDIT, {
          inventoryId: item.inventoryId,
          itemId: item.id,
        })
      : generatePath(APP_ROUTES.ITEM_VIEW, { itemId: item.id });

    return (
      <Link
        to={destination}
        onClick={(event) => event.stopPropagation()}
        className="font-mono text-xs underline decoration-dotted hover:text-teal-700 hover:decoration-solid focus:text-teal-700 dark:hover:text-teal-300"
        title={canEdit ? 'Open item in edit mode' : 'Open item'}
        aria-label={canEdit ? 'Open item in edit mode' : 'Open item'}
      >
        {item.customId || 'N/A'}
      </Link>
    );
  }

  if (columnKey === 'likes') {
    return (
      <LikeButton
        inventoryId={item.inventoryId}
        itemId={item.id}
        isLiked={item.isLikedByCurrentUser || false}
        likesCount={item._count?.likes || 0}
        size="sm"
        onClick={(event) => event.stopPropagation()}
      />
    );
  }

  const fieldKey = columnKey;
  const value = getItemValue(item, fieldKey);

  if (fieldKey.startsWith('bool')) {
    if (value === null || value === undefined) return '-';
    const isTrue = Boolean(value);
    return (
      <span
        className={[
          'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
          isTrue
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        ].join(' ')}
      >
        {isTrue ? 'Yes' : 'No'}
      </span>
    );
  }

  if (fieldKey.startsWith('num')) {
    return typeof value === 'number' ? String(value) : '-';
  }

  if (fieldKey.startsWith('link')) {
    if (typeof value !== 'string' || !value) return '-';
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        onClick={(event) => event.stopPropagation()}
      >
        Link
      </a>
    );
  }

  return typeof value === 'string' && value ? value : '-';
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
      className="max-h-[700px] overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-900"
      style={{ scrollbarGutter: 'stable' }}
    >
      <table className="w-full min-w-[900px] table-fixed divide-y divide-gray-200 dark:divide-gray-700">
        <colgroup>
          {canEdit && <col className="w-[50px]" />}
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>

        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
          <tr>
            {canEdit && (
              <th
                scope="col"
                className="px-2 py-1.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(event) => onSelectAll(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800"
                  onClick={(event) => event.stopPropagation()}
                />
              </th>
            )}

            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-2 py-1.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
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

        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900/40">
          {items.map((item) => {
            const isSelected = selectedIds.has(item.id);
            const rowClassName = [
              'transition-colors',
              canEdit ? 'cursor-pointer' : '',
              isSelected
                ? 'bg-teal-50 dark:bg-teal-900/20'
                : 'odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:odd:bg-gray-800/60 dark:even:bg-gray-800/40 dark:hover:bg-gray-700/60',
            ].join(' ');

            return (
              <tr key={item.id} onClick={(): void => handleRowClick(item)} className={rowClassName}>
                {canEdit && (
                  <td className="px-2 py-1.5 text-left text-sm">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(event) => onSelectOne(item.id, event.target.checked)}
                      onClick={(event) => event.stopPropagation()}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </td>
                )}

                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-2 py-1.5 text-left text-sm text-gray-800 dark:text-gray-200"
                  >
                    {formatCell(item, column.key, canEdit)}
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
