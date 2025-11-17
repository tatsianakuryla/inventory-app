import type { JSX } from 'react';
import { Button } from '../../../Button/Button';
import { Spinner } from '../../../Spinner/Spinner';
import { ShieldCheck, ShieldOff, UserCog, UserX, Trash2 } from 'lucide-react';
import * as styles from './users-toolbar.styles';

interface UsersToolbarProperties {
  selectedCount: number;
  onBlock: () => void;
  onUnblock: () => void;
  onPromote: () => void;
  onDemote: () => void;
  onDelete: () => void;
  onClearSelection: () => void;
  isBlocking: boolean;
  isUnblocking: boolean;
  isPromoting: boolean;
  isDemoting: boolean;
  isDeleting: boolean;
}

export const UsersToolbar = ({
  selectedCount,
  onBlock,
  onUnblock,
  onPromote,
  onDemote,
  onDelete,
  onClearSelection,
  isBlocking,
  isUnblocking,
  isPromoting,
  isDemoting,
  isDeleting,
}: UsersToolbarProperties): JSX.Element => {
  const hasSelection = selectedCount > 0;
  const isAnyOperationPending =
    isBlocking || isUnblocking || isPromoting || isDemoting || isDeleting;
  const isDisabled = !hasSelection || isAnyOperationPending;

  return (
    <div
      className={[
        styles.containerBase,
        hasSelection ? styles.containerSelected : styles.containerDefault,
      ].join(' ')}
    >
      <div className={styles.headerContainer}>
        <span
          className={[
            styles.textBase,
            hasSelection ? styles.textSelected : styles.textDefault,
          ].join(' ')}
        >
          {selectedCount > 0 ? (
            <>
              {selectedCount} {selectedCount === 1 ? 'user' : 'users'} selected
            </>
          ) : (
            'No users selected'
          )}
        </span>

        <Button
          onClick={onClearSelection}
          disabled={isDisabled}
          variant="secondary"
          size="sm"
          className={styles.clearButton}
        >
          Clear Selection
        </Button>
      </div>

      <div className={styles.actionsContainer}>
        <Button
          onClick={onBlock}
          disabled={isDisabled}
          variant="secondary"
          size="sm"
          className={styles.buttonWithIcon}
        >
          {isBlocking ? (
            <Spinner />
          ) : (
            <>
              <ShieldOff className={styles.iconSize} />
              Block
            </>
          )}
        </Button>

        <Button
          onClick={onUnblock}
          disabled={isDisabled}
          variant="secondary"
          size="sm"
          className={styles.buttonWithIcon}
        >
          {isUnblocking ? (
            <Spinner />
          ) : (
            <>
              <ShieldCheck className={styles.iconSize} />
              Unblock
            </>
          )}
        </Button>

        <Button
          onClick={onPromote}
          disabled={isDisabled}
          variant="secondary"
          size="sm"
          className={styles.buttonWithIcon}
        >
          {isPromoting ? (
            <Spinner />
          ) : (
            <>
              <UserCog className={styles.iconSize} />
              Make Admin
            </>
          )}
        </Button>

        <Button
          onClick={onDemote}
          disabled={isDisabled}
          variant="secondary"
          size="sm"
          className={styles.buttonWithIcon}
        >
          {isDemoting ? (
            <Spinner />
          ) : (
            <>
              <UserX className={styles.iconSize} />
              Make User
            </>
          )}
        </Button>

        <Button
          onClick={onDelete}
          disabled={isDisabled}
          variant="secondary"
          size="sm"
          className={styles.deleteButton}
        >
          {isDeleting ? (
            <Spinner label="Deleting" />
          ) : (
            <>
              <Trash2 className={styles.iconSize} />
              Delete
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
