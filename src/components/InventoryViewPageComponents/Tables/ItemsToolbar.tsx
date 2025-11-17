import type { JSX } from 'react';
import { getTailWindClass } from '../../../shared/helpers/helpers';
import { Button } from '../../Button/Button';
import { Spinner } from '../../Spinner/Spinner';
import * as styles from './items-toolbar.styles';

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
              {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
            </>
          ) : (
            'No items selected'
          )}
        </span>
      </div>

      <div className={styles.actionsContainer}>
        <Button
          onClick={onDelete}
          disabled={!hasSelection || isDeleting}
          variant="secondary"
          className={styles.deleteButton}
        >
          {isDeleting ? <Spinner label="Deleting" /> : 'Delete Selected'}
        </Button>

        <Button
          onClick={onClearSelection}
          disabled={!hasSelection || isDeleting}
          variant="secondary"
          className={styles.buttonWithIcon}
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
};
