import { useId, useState, type ChangeEvent, type JSX } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';
import { getTailWindClass } from '../../shared/helpers/helpers';
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
  passwordToggleButton,
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
                className={passwordToggleButton}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
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
