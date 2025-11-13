import type { JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import type { InventoryCreateRequestInput } from '../../../api/InventoryService/inventory.schemas';
import * as styles from './visibility-toggler.styles';

export function VisibilityToggler({ disabled }: { disabled?: boolean }): JSX.Element {
  const { register } = useFormContext<InventoryCreateRequestInput>();

  return (
    <div className={styles.container}>
      <label htmlFor="isPublic" className={styles.label}>
        Visibility
      </label>

      <div className={styles.wrapper}>
        <div className={styles.textWrapper}>
          <p className={styles.title}>Make this inventory public</p>
          <p className={styles.description}>
            Public inventories can be viewed by anyone with access.
          </p>
        </div>

        <label className={styles.toggleLabel}>
          <input
            id="isPublic"
            type="checkbox"
            {...register('isPublic')}
            disabled={disabled}
            className={styles.toggleInput}
          />
          <div className={styles.toggleBackground}></div>
          <div className={styles.toggleDot}></div>
        </label>
      </div>
    </div>
  );
}
