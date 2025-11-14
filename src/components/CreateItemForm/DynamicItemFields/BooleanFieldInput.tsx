import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { ItemCreateRequest } from '../../../api/ItemsService/items.schemas';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import { FieldWrapper } from './FieldWrapper';
import * as styles from './dynamic-item-fields.styles';

interface BooleanFieldInputProperties {
  name: 'bool1' | 'bool2' | 'bool3';
  label?: string | null;
  desc?: string | null;
  disabled?: boolean;
  error?: string;
}

export const BooleanFieldInput = ({
  name,
  label,
  desc,
  disabled,
  error,
}: BooleanFieldInputProperties): JSX.Element => {
  const { control } = useFormContext<ItemCreateRequest>();

  return (
    <FieldWrapper label={label} desc={desc}>
      <Controller<ItemCreateRequest, typeof name>
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                disabled={disabled}
                checked={Boolean(field.value)}
                onChange={(event) => field.onChange(event.target.checked)}
                onBlur={field.onBlur}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>{field.value ? 'Yes' : 'No'}</span>
            </label>
            {error && <ErrorBlock>{error}</ErrorBlock>}
          </>
        )}
      />
    </FieldWrapper>
  );
};
