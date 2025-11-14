import type { JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import type { InventoryFields } from '../../../api/InventoryService/inventory.schemas';
import type { ItemCreateRequest } from '../../../api/ItemsService/items.schemas';
import { TextFieldInput } from './TextFieldInput';
import { NumberFieldInput } from './NumberFieldInput';
import { BooleanFieldInput } from './BooleanFieldInput';
import { useFieldDescriptors } from './useFieldDescriptors';
import * as styles from './dynamic-item-fields.styles';
import { isBooleanKey, isItemCreateKey, isNumberKey, isTextKey } from '../create-item-form.types';

interface DynamicItemFieldsProperties {
  fields: InventoryFields;
  disabled?: boolean;
}

export const DynamicItemFields = ({
  fields,
  disabled,
}: DynamicItemFieldsProperties): JSX.Element => {
  const { formState } = useFormContext<ItemCreateRequest>();
  const descriptors = useFieldDescriptors(fields);

  const getErrorMessage = (key: string): string | undefined => {
    if (!isItemCreateKey(key)) return undefined;
    const fieldError = formState.errors[key];
    return fieldError?.message ? String(fieldError.message) : undefined;
  };

  if (descriptors.length === 0) {
    return (
      <p className={styles.emptyText}>No fields are configured to be shown in this inventory</p>
    );
  }

  return (
    <>
      {descriptors.map((desc) => {
        const key = desc.key;
        const error = getErrorMessage(key);

        if (desc.type === 'text' || desc.type === 'long') {
          if (!isTextKey(key)) return;
          return (
            <TextFieldInput
              key={key}
              name={key}
              label={desc.label}
              desc={desc.desc}
              disabled={disabled}
              multiline={desc.type === 'long'}
              error={error}
            />
          );
        }

        if (desc.type === 'link') {
          if (!isTextKey(key)) return;
          return (
            <TextFieldInput
              key={key}
              name={key}
              label={desc.label}
              desc={desc.desc}
              disabled={disabled}
              type="url"
              error={error}
            />
          );
        }

        if (desc.type === 'number') {
          if (!isNumberKey(key)) return;
          return (
            <NumberFieldInput
              key={key}
              name={key}
              label={desc.label}
              desc={desc.desc}
              disabled={disabled}
              error={error}
            />
          );
        }

        if (isBooleanKey(key)) {
          return (
            <BooleanFieldInput
              key={key}
              name={key}
              label={desc.label}
              desc={desc.desc}
              disabled={disabled}
              error={error}
            />
          );
        }

        return;
      })}
    </>
  );
};
