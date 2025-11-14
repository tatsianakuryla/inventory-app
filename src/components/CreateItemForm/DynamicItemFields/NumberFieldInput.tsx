import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { ItemCreateRequest } from '../../../api/ItemsService/items.schemas';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import { FieldWrapper } from './FieldWrapper';
import * as styles from './dynamic-item-fields.styles';

interface NumberFieldInputProperties {
  name: 'num1' | 'num2' | 'num3';
  label?: string | null;
  desc?: string | null;
  disabled?: boolean;
  error?: string;
}

export const NumberFieldInput = ({
  name,
  label,
  desc,
  disabled,
  error,
}: NumberFieldInputProperties): JSX.Element => {
  const { control } = useFormContext<ItemCreateRequest>();

  return (
    <FieldWrapper label={label} desc={desc}>
      <Controller<ItemCreateRequest, typeof name>
        name={name}
        control={control}
        render={({ field }) => {
          const numberValue = typeof field.value === 'number' ? field.value : '';
          return (
            <>
              <input
                type="number"
                disabled={disabled}
                value={numberValue}
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === '' ? undefined : event.target.valueAsNumber);
                }}
                onBlur={field.onBlur}
                className={styles.input}
              />
              {error && <ErrorBlock>{error}</ErrorBlock>}
            </>
          );
        }}
      />
    </FieldWrapper>
  );
};
