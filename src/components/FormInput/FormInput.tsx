import { useId, useState, type ChangeEvent, type JSX } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';
import { getTailWindClass } from '../../shared/helpers/helpers';
import { PasswordToggleButton } from './PasswordToggleButton';
import {
  baseWrapper,
  labelClass,
  requiredMark,
  optionalMark,
  inputWrapperBase,
  inputWrapperNormal,
  inputWrapperError,
  inputWrapperDisabled,
  baseInput,
  textInput,
  textareaInput,
  passwordInputPadding,
  errorContainer,
} from './form-input.styles';

type StringForm = Record<string, string>;

type FormInputProperties = {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'url';
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
};

export function FormInput({
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  disabled,
  className,
  required,
  multiline,
  rows = 4,
}: FormInputProperties): JSX.Element {
  const { control } = useFormContext<StringForm>();
  const { field, fieldState } = useController<StringForm, typeof name>({ name, control });
  const id = useId();
  const hasError = !!fieldState.error;
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    field.onChange(event.target.value);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  return (
    <div className={getTailWindClass(baseWrapper, className)}>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}{' '}
          {required ? (
            <span className={requiredMark}>*</span>
          ) : (
            <span className={optionalMark}>(optional)</span>
          )}
        </label>
      )}

      <div
        className={getTailWindClass(
          inputWrapperBase,
          hasError ? inputWrapperError : inputWrapperNormal,
          disabled && inputWrapperDisabled
        )}
      >
        {multiline ? (
          <textarea
            id={id}
            name={field.name}
            ref={field.ref}
            value={field.value || ''}
            onChange={onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            rows={rows}
            className={getTailWindClass(baseInput, textareaInput)}
          />
        ) : (
          <>
            <input
              id={id}
              name={field.name}
              ref={field.ref}
              value={field.value || ''}
              onChange={onChange}
              onBlur={field.onBlur}
              type={inputType}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              aria-invalid={hasError || undefined}
              className={getTailWindClass(
                baseInput,
                textInput,
                isPasswordField && passwordInputPadding
              )}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            {isPasswordField && (
              <PasswordToggleButton
                showPassword={showPassword}
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
              />
            )}
          </>
        )}
      </div>

      <div className={errorContainer}>
        {hasError && <ErrorBlock>{String(fieldState.error?.message ?? '')}</ErrorBlock>}
      </div>
    </div>
  );
}
