import type { JSX } from 'react';
import { Button } from '../../../Button/Button';
import { Spinner } from '../../../Spinner/Spinner';
import { Globe, Lock } from 'lucide-react';

interface InventoriesToolbarProperties {
  selectedCount: number;
  onDelete: () => void;
  onMakePublic: () => void;
  onMakePrivate: () => void;
  onClearSelection: () => void;
  isDeleting: boolean;
  isMakingPublic: boolean;
  isMakingPrivate: boolean;
}

export const InventoriesToolbar = ({
  selectedCount,
  onDelete,
  onMakePublic,
  onMakePrivate,
  onClearSelection,
  isDeleting,
  isMakingPublic,
  isMakingPrivate,
}: InventoriesToolbarProperties): JSX.Element => {
  const hasSelection = selectedCount > 0;
  const isAnyOperationPending = isDeleting || isMakingPublic || isMakingPrivate;
  const isDisabled = !hasSelection || isAnyOperationPending;

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
            hasSelection ? 'text-teal-900 dark:text-teal-100' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {selectedCount > 0 ? (
            <>
              {selectedCount} {selectedCount === 1 ? 'inventory' : 'inventories'} selected
            </>
          ) : (
            'No inventories selected'
          )}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onMakePublic}
          disabled={isDisabled}
          variant="secondary"
          className="inline-flex items-center gap-1.5"
        >
          {isMakingPublic ? (
            <Spinner />
          ) : (
            <>
              <Globe className="h-4 w-4" />
              Make Public
            </>
          )}
        </Button>

        <Button
          onClick={onMakePrivate}
          disabled={isDisabled}
          variant="secondary"
          className="inline-flex items-center gap-1.5"
        >
          {isMakingPrivate ? (
            <Spinner />
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Make Private
            </>
          )}
        </Button>

        <Button
          onClick={onDelete}
          disabled={isDisabled}
          variant="secondary"
          className="!bg-red-600 !text-white hover:!bg-red-700 disabled:!bg-gray-400 disabled:!text-gray-200 dark:!bg-red-700 dark:hover:!bg-red-800"
        >
          {isDeleting ? <Spinner label="Deleting" /> : 'Delete Selected'}
        </Button>

        <Button onClick={onClearSelection} disabled={isDisabled} variant="secondary">
          Clear Selection
        </Button>
      </div>
    </div>
  );
};
