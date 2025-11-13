import type { JSX } from 'react';
import { Button } from '../../Button/Button';
import { Spinner } from '../../Spinner/Spinner';

interface ItemsToolbarProperties {
  selectedCount: number;
  onDelete: () => void;
  onClearSelection: () => void;
  isDeleting: boolean;
}

export const ItemsToolbar = ({
  selectedCount,
  onDelete,
  onClearSelection,
  isDeleting,
}: ItemsToolbarProperties): JSX.Element => {
  const hasSelection = selectedCount > 0;

  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-4 py-3 shadow-sm ${
        hasSelection
          ? 'border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20'
          : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/40'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-medium ${
            hasSelection
              ? 'textClass-teal-900 dark:textClass-teal-100'
              : 'textClass-gray-600 dark:textClass-gray-400'
          }`}
        >
          {selectedCount > 0 ? (
            <>
              {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
            </>
          ) : (
            'No items selected'
          )}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onDelete}
          disabled={!hasSelection || isDeleting}
          variant="secondary"
          className="!bg-red-600 !text-white hover:!bg-red-700 disabled:!bg-gray-400 disabled:!text-gray-200 dark:!bg-red-700 dark:hover:!bg-red-800"
        >
          {isDeleting ? <Spinner label="Deleting" /> : 'Delete Selected'}
        </Button>

        <Button
          onClick={onClearSelection}
          disabled={!hasSelection || isDeleting}
          variant="secondary"
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
};
