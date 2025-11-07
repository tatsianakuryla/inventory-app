import { useId, useState, type ChangeEvent, type JSX } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';

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
    <div className={`flex w-full flex-col gap-1 ${className ?? ''}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}{' '}
          {required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">(optional)</span>
          )}
        </label>
      )}

      <div
        className={`relative flex items-center rounded-xl border bg-white shadow-sm transition-colors focus-within:ring-2 dark:bg-gray-900 ${
          hasError
            ? 'border-red-400 focus-within:ring-red-400 dark:border-red-500 dark:focus-within:ring-red-600'
            : 'border-gray-300 focus-within:ring-emerald-500 dark:border-gray-700 dark:focus-within:ring-emerald-700'
        } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
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
            className={`w-full resize-y bg-transparent px-3 py-2 text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500`}
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
              className={`h-9 w-full bg-transparent px-3 text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500 ${isPasswordField ? 'pr-10' : ''}`}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            {isPasswordField && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
                className="absolute right-2 flex h-9 items-center justify-center px-2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
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

      <div className="flex">
        {hasError && <ErrorBlock>{String(fieldState.error?.message ?? '')}</ErrorBlock>}
      </div>
    </div>
  );
}
