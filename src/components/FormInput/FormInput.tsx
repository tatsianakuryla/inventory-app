import { useId, type ChangeEvent, type JSX } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';

type StringForm = Record<string, string>;

type FormInputProperties = {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
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
}: FormInputProperties): JSX.Element {
  const { control } = useFormContext<StringForm>();
  const { field, fieldState } = useController<StringForm, typeof name>({ name, control });
  const id = useId();
  const hasError = !!fieldState.error;

  const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
    field.onChange(event.target.value);

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
        <input
          id={id}
          name={field.name}
          ref={field.ref}
          value={field.value}
          onChange={onChange}
          onBlur={field.onBlur}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className={`h-9 w-full bg-transparent px-3 text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500`}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>

      <div className="flex">
        {hasError && <ErrorBlock>{String(fieldState.error?.message ?? '')}</ErrorBlock>}
      </div>
    </div>
  );
}
