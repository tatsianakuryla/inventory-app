import type { JSX } from 'react';
import { FormInput } from '../../FormInput/FormInput';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import * as styles from './dynamic-item-fields.styles';

interface TextFieldInputProperties {
  name: string;
  label?: string | null;
  desc?: string | null;
  disabled?: boolean;
  multiline?: boolean;
  type?: 'text' | 'url';
  error?: string;
}

export const TextFieldInput = ({
  name,
  label,
  desc,
  disabled,
  multiline,
  type = 'text',
  error,
}: TextFieldInputProperties): JSX.Element => {
  return (
    <div className={styles.inputWrapper}>
      <FormInput
        name={name}
        label={label ?? undefined}
        placeholder={desc ?? (type === 'url' ? 'https://example.com' : undefined)}
        disabled={disabled}
        multiline={multiline}
        type={type}
      />
      {error && <ErrorBlock>{error}</ErrorBlock>}
    </div>
  );
};
