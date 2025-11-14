import type { JSX } from 'react';
import { generatePath, Link } from 'react-router-dom';
import type { Item } from '../../../../api/ItemsService/items.schemas';
import type { FieldKey } from '../../../../api/InventoryService/inventory.schemas';
import { APP_ROUTES } from '../../../../appRouter/routes/routes';
import { LikeButton } from '../../../LikeButton/LikeButton';
import { isFieldKey } from '../../../../shared/typeguards/typeguards';
import type { ColumnConfig } from './table-columns';

function getItemValue(item: Item, key: FieldKey): string | number | boolean | null | undefined {
  return item[key];
}

export function formatCell(
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
