import type { JSX } from 'react';
import { useCallback, useMemo } from 'react';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import type { Item } from '../../../api/ItemsService/items.schemas';
import type { FieldKey, InventoryFields } from '../../../api/InventoryService/inventory.schemas';
import { FIELD_KEYS, NAME_KEYS, STATE_KEYS } from '../../../api/InventoryService/inventory.schemas';
import type { SortOrder } from '../../Tables/SortableHeader/SortableHeader';
import { SortableHeader } from '../../Tables/SortableHeader/SortableHeader';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { LikeButton } from '../../LikeButton/LikeButton';
import { isFieldKey } from '../../../shared/typeguards/typeguards';
import { FieldStates } from '../../../shared/types/enums';

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

function getField<F extends keyof InventoryFields>(
  fields: InventoryFields | null | undefined,
  key: F
): unknown {
  return fields ? Reflect.get(fields, key) : undefined;
}

function getItemValue(item: Item, key: FieldKey): string | number | boolean | null | undefined {
  return item[key];
}

function buildColumns(inventoryFields?: InventoryFields | null): ColumnConfig[] {
  const columns: ColumnConfig[] = [
    { key: 'customId', label: 'ID', width: '12%' },
    { key: 'likes', label: 'Likes', width: '8%' },
  ];

  const hasConfiguredFields = FIELD_KEYS.some(
    (k) => getField(inventoryFields, STATE_KEYS[k]) === FieldStates.SHOWN
  );

  if (!hasConfiguredFields) {
    columns.push({ key: 'text1', label: 'Name', width: '80%' });
    return columns;
  }

  let visibleCount = 0;

  for (const fieldKey of FIELD_KEYS) {
    const state = getField(inventoryFields, STATE_KEYS[fieldKey]);
    const nameValue = getField(inventoryFields, NAME_KEYS[fieldKey]);
    const label =
      typeof nameValue === 'string' && nameValue.trim()
        ? nameValue
        : String(fieldKey).toUpperCase();

    if (state === FieldStates.SHOWN) {
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
        className="block overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline focus:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
        title={`${item.customId || 'N/A'} - ${canEdit ? 'Click to edit' : 'Click to view'}`}
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

  if (!isFieldKey(columnKey)) {
    return <span className="text-gray-400 dark:text-gray-500">-</span>;
  }

  const value = getItemValue(item, columnKey);

  if (columnKey.startsWith('bool')) {
    if (value === null || value === undefined) return '-';
    const isTrue = Boolean(value);
    return (
      <span
        className={[
          'textClass-xs inline-flex items-center rounded-full px-2 py-1 font-medium',
          isTrue
            ? 'textClass-green-800 dark:textClass-green-400 bg-green-100 dark:bg-green-900/30'
            : 'textClass-gray-800 dark:textClass-gray-300 bg-gray-100 dark:bg-gray-700',
        ].join(' ')}
      >
        {isTrue ? 'Yes' : 'No'}
      </span>
    );
  }

  if (columnKey.startsWith('num')) {
    if (typeof value !== 'number')
      return <span className="text-gray-400 dark:text-gray-500">-</span>;
    return <span className="font-mono">{value.toLocaleString()}</span>;
  }

  if (columnKey.startsWith('link')) {
    if (typeof value !== 'string' || !value) return '-';
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        onClick={(event) => event.stopPropagation()}
        title={value}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        Link
      </a>
    );
  }

  if (typeof value === 'string' && value) {
    if (columnKey.startsWith('long')) {
      return (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap" title={value}>
          {value}
        </div>
      );
    }
    return (
      <div className="overflow-hidden text-ellipsis whitespace-nowrap" title={value}>
        {value}
      </div>
    );
  }

  return <span className="text-gray-400 dark:text-gray-500">-</span>;
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

        <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <tr>
            {canEdit && (
              <th className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(event) => onSelectAll(event.target.checked)}
                  onClick={(event) => event.stopPropagation()}
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  aria-label="Select all items"
                />
              </th>
            )}

            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
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

        <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={canEdit ? columns.length + 1 : columns.length}
                className="px-4 py-12 text-center"
              >
                <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="text-sm font-medium">No items found</p>
                </div>
              </td>
            </tr>
          ) : (
            items.map((item) => {
              const isSelected = selectedIds.has(item.id);
              const rowClassName = [
                'transition-colors duration-150',
                canEdit ? 'cursor-pointer' : '',
                isSelected
                  ? 'bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/30'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
              ].join(' ');

              return (
                <tr
                  key={item.id}
                  onClick={(): void => handleRowClick(item)}
                  className={rowClassName}
                >
                  {canEdit && (
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(event) => onSelectOne(item.id, event.target.checked)}
                        onClick={(event) => event.stopPropagation()}
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                        aria-label="Select item"
                      />
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="overflow-hidden px-4 py-3 text-left text-sm text-gray-900 dark:text-gray-100"
                    >
                      {formatCell(item, column.key, canEdit)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
