import type { JSX } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { InventoryFields } from '../../../api/InventoryService/inventory.schemas';
import type { ItemCreateRequest } from '../../../api/ItemsService/items.schemas';
import { FormInput } from '../../FormInput/FormInput';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import { FieldStates } from '../../../shared/types/enums';
import * as styles from './dynamic-item-fields.styles';

interface DynamicItemFieldsProperties {
  fields: InventoryFields;
  disabled?: boolean;
}

type FieldKey =
  | 'text1'
  | 'text2'
  | 'text3'
  | 'long1'
  | 'long2'
  | 'long3'
  | 'num1'
  | 'num2'
  | 'num3'
  | 'link1'
  | 'link2'
  | 'link3'
  | 'bool1'
  | 'bool2'
  | 'bool3';

export const DynamicItemFields = ({
  fields,
  disabled,
}: DynamicItemFieldsProperties): JSX.Element => {
  const methods = useFormContext<ItemCreateRequest>();

  const getErrorMessage = (key: FieldKey): string | undefined => {
    const fieldError = methods.formState.errors[key];
    return fieldError?.message ? String(fieldError.message) : undefined;
  };

  const Wrapper = ({
    children,
    label,
    desc,
  }: {
    children: JSX.Element;
    label?: string | null;
    desc?: string | null;
  }): JSX.Element => (
    <div className={styles.fieldWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      {desc && <p className={styles.hint}>{desc}</p>}
      {children}
    </div>
  );

  type Descriptor =
    | { key: FieldKey; type: 'text'; label?: string | null; desc?: string | null }
    | { key: FieldKey; type: 'long'; label?: string | null; desc?: string | null }
    | { key: FieldKey; type: 'number'; label?: string | null; desc?: string | null }
    | { key: FieldKey; type: 'link'; label?: string | null; desc?: string | null }
    | { key: FieldKey; type: 'bool'; label?: string | null; desc?: string | null };

  const descriptors: Descriptor[] = [
    ...(fields.text1State === FieldStates.SHOWN
      ? [
          {
            key: 'text1' as const,
            type: 'text' as const,
            label: fields.text1Name,
            desc: fields.text1Desc,
          },
        ]
      : []),
    ...(fields.text2State === FieldStates.SHOWN
      ? [
          {
            key: 'text2' as const,
            type: 'text' as const,
            label: fields.text2Name,
            desc: fields.text2Desc,
          },
        ]
      : []),
    ...(fields.text3State === FieldStates.SHOWN
      ? [
          {
            key: 'text3' as const,
            type: 'text' as const,
            label: fields.text3Name,
            desc: fields.text3Desc,
          },
        ]
      : []),

    ...(fields.long1State === FieldStates.SHOWN
      ? [
          {
            key: 'long1' as const,
            type: 'long' as const,
            label: fields.long1Name,
            desc: fields.long1Desc,
          },
        ]
      : []),
    ...(fields.long2State === FieldStates.SHOWN
      ? [
          {
            key: 'long2' as const,
            type: 'long' as const,
            label: fields.long2Name,
            desc: fields.long2Desc,
          },
        ]
      : []),
    ...(fields.long3State === FieldStates.SHOWN
      ? [
          {
            key: 'long3' as const,
            type: 'long' as const,
            label: fields.long3Name,
            desc: fields.long3Desc,
          },
        ]
      : []),

    ...(fields.num1State === FieldStates.SHOWN
      ? [
          {
            key: 'num1' as const,
            type: 'number' as const,
            label: fields.num1Name,
            desc: fields.num1Desc,
          },
        ]
      : []),
    ...(fields.num2State === FieldStates.SHOWN
      ? [
          {
            key: 'num2' as const,
            type: 'number' as const,
            label: fields.num2Name,
            desc: fields.num2Desc,
          },
        ]
      : []),
    ...(fields.num3State === FieldStates.SHOWN
      ? [
          {
            key: 'num3' as const,
            type: 'number' as const,
            label: fields.num3Name,
            desc: fields.num3Desc,
          },
        ]
      : []),

    ...(fields.link1State === FieldStates.SHOWN
      ? [
          {
            key: 'link1' as const,
            type: 'link' as const,
            label: fields.link1Name,
            desc: fields.link1Desc,
          },
        ]
      : []),
    ...(fields.link2State === FieldStates.SHOWN
      ? [
          {
            key: 'link2' as const,
            type: 'link' as const,
            label: fields.link2Name,
            desc: fields.link2Desc,
          },
        ]
      : []),
    ...(fields.link3State === FieldStates.SHOWN
      ? [
          {
            key: 'link3' as const,
            type: 'link' as const,
            label: fields.link3Name,
            desc: fields.link3Desc,
          },
        ]
      : []),

    ...(fields.bool1State === FieldStates.SHOWN
      ? [
          {
            key: 'bool1' as const,
            type: 'bool' as const,
            label: fields.bool1Name,
            desc: fields.bool1Desc,
          },
        ]
      : []),
    ...(fields.bool2State === FieldStates.SHOWN
      ? [
          {
            key: 'bool2' as const,
            type: 'bool' as const,
            label: fields.bool2Name,
            desc: fields.bool2Desc,
          },
        ]
      : []),
    ...(fields.bool3State === FieldStates.SHOWN
      ? [
          {
            key: 'bool3' as const,
            type: 'bool' as const,
            label: fields.bool3Name,
            desc: fields.bool3Desc,
          },
        ]
      : []),
  ].filter((d) => d.label);

  if (descriptors.length === 0) {
    return (
      <p className={styles.emptyText}>No fields are configured to be shown in this inventory</p>
    );
  }

  return (
    <>
      {descriptors.map((desc) => {
        const error = getErrorMessage(desc.key);
        if (desc.type === 'text' || desc.type === 'long' || desc.type === 'link') {
          return (
            <div key={desc.key} className={styles.inputWrapper}>
              <FormInput
                name={desc.key}
                label={desc.label ?? undefined}
                placeholder={
                  desc.desc ?? (desc.type === 'link' ? 'https://example.com' : undefined)
                }
                disabled={disabled}
                multiline={desc.type === 'long'}
                type={desc.type === 'link' ? 'url' : 'text'}
              />
              {error && <ErrorBlock>{error}</ErrorBlock>}
            </div>
          );
        }
        if (desc.type === 'number') {
          return (
            <Wrapper key={desc.key} label={desc.label} desc={desc.desc}>
              <Controller<ItemCreateRequest, typeof desc.key>
                name={desc.key}
                control={methods.control}
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
            </Wrapper>
          );
        }
        return (
          <Wrapper key={desc.key} label={desc.label} desc={desc.desc}>
            <Controller<ItemCreateRequest, typeof desc.key>
              name={desc.key}
              control={methods.control}
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
          </Wrapper>
        );
      })}
    </>
  );
};
