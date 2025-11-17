import type { JSX } from 'react';
import { getTailWindClass } from '../../../../shared/helpers/helpers';
import { Button } from '../../../Button/Button';
import { Spinner } from '../../../Spinner/Spinner';
import { Globe, Lock, Trash2, X } from 'lucide-react';
import * as styles from './inventories-toolbar.styles';

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

  const containerClassName = getTailWindClass(
    styles.containerBase,
    hasSelection ? styles.containerSelected : styles.containerDefault
  );

  const textClassName = getTailWindClass(
    styles.textBase,
    hasSelection ? styles.textSelected : styles.textDefault
  );

  return (
    <div className={containerClassName}>
      <div className={styles.headerContainer}>
        <span className={textClassName}>
          {selectedCount > 0 ? (
            <>
              {selectedCount} {selectedCount === 1 ? 'inventory' : 'inventories'} selected
            </>
          ) : (
            'No inventories selected'
          )}
        </span>
      </div>

      <div className={styles.actionsContainer}>
        <Button
          onClick={onMakePublic}
          disabled={isDisabled}
          variant="secondary"
          className={styles.buttonWithIcon}
        >
          {isMakingPublic ? (
            <Spinner />
          ) : (
            <>
              <Globe className={styles.iconSize} />
              <span className="hidden sm:inline">Make Public</span>
            </>
          )}
        </Button>

        <Button
          onClick={onMakePrivate}
          disabled={isDisabled}
          variant="secondary"
          className={styles.buttonWithIcon}
        >
          {isMakingPrivate ? (
            <Spinner />
          ) : (
            <>
              <Lock className={styles.iconSize} />
              <span className="hidden sm:inline">Make Private</span>
            </>
          )}
        </Button>

        <Button
          onClick={onDelete}
          disabled={isDisabled}
          variant="secondary"
          className={styles.deleteButton}
        >
          {isDeleting ? (
            <Spinner label="Deleting" />
          ) : (
            <>
              <Trash2 className={styles.iconSize} />
              <span className="hidden sm:inline">Delete Selected</span>
            </>
          )}
        </Button>

        <Button
          onClick={onClearSelection}
          disabled={isDisabled}
          variant="secondary"
          className={styles.buttonWithIcon}
        >
          <X className={styles.iconSize} />
          <span className="hidden sm:inline">Clear Selection</span>
        </Button>
      </div>
    </div>
  );
};
