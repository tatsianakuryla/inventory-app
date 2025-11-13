import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormInput } from '../../FormInput/FormInput';
import { CategorySelect } from '../CategorySelect/CategorySelect';
import type { InventoryCreateRequestInput } from '../../../api/InventoryService/inventory.schemas';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import { getTailWindClass } from '../../../shared/helpers/helpers';
import * as styles from './name-and-category-row.styles';

export function NameAndCategoryRow({ disabled }: { disabled?: boolean }): JSX.Element {
  const methods = useFormContext<InventoryCreateRequestInput>();
  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <FormInput
          name="name"
          label="Inventory Name"
          placeholder="Lego, pens, etc."
          disabled={disabled}
          required
        />
      </div>
      <div className={styles.column}>
        <div className={styles.fieldWrapper}>
          <label htmlFor="categoryId" className={styles.label}>
            Category <span className={styles.optional}>(optional)</span>
          </label>

          <Controller
            name="categoryId"
            control={methods.control}
            render={({ field }) => (
              <div
                className={getTailWindClass(
                  styles.categoryWrapper,
                  methods.formState.errors.categoryId
                    ? styles.categoryWrapperError
                    : styles.categoryWrapperNormal
                )}
              >
                <CategorySelect value={field.value} onChange={field.onChange} disabled={disabled} />
              </div>
            )}
          />
          {methods.formState.errors.categoryId && (
            <ErrorBlock>{methods.formState.errors.categoryId.message}</ErrorBlock>
          )}
        </div>
      </div>
    </div>
  );
}
