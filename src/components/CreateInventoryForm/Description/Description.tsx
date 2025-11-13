import type { JSX } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import type { InventoryCreateRequestInput } from '../../../api/InventoryService/inventory.schemas';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import { getTailWindClass } from '../../../shared/helpers/helpers';
import * as styles from './description.styles';

export function DescriptionWithCounter({ disabled }: { disabled?: boolean }): JSX.Element {
  const methods = useFormContext<InventoryCreateRequestInput>();
  const description = useWatch({ control: methods.control, name: 'description' });
  const descriptionLength = description?.length ?? 0;
  const descriptionMax = 10_000;

  return (
    <div className={styles.container}>
      <div className={styles.fieldWrapper}>
        <label htmlFor="description" className={styles.label}>
          Description <span className={styles.optional}>(optional)</span>
        </label>

        <textarea
          id="description"
          {...methods.register('description')}
          placeholder="Any notes for collaborators"
          disabled={disabled}
          rows={5}
          className={getTailWindClass(
            styles.textareaBase,
            methods.formState.errors.description ? styles.textareaError : styles.textareaNormal
          )}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.errorWrapper}>
          {methods.formState.errors.description && (
            <ErrorBlock>{methods.formState.errors.description.message}</ErrorBlock>
          )}
        </div>
        <p
          className={getTailWindClass(
            styles.counter,
            descriptionLength > descriptionMax ? styles.counterError : styles.counterNormal
          )}
        >
          {descriptionLength}/{descriptionMax}
        </p>
      </div>
    </div>
  );
}
