import { useId, useState, type JSX, type ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

type StringForm = Record<string, string>;

type FormInputProperties = {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
};

export function FormInput({
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  disabled,
  className,
}: FormInputProperties): JSX.Element {
  const { control } = useFormContext<StringForm>();
  const { field, fieldState } = useController<StringForm, typeof name>({
    name,
    control,
  });
  const id = useId();
  const hasError = !!fieldState.error;
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && show ? 'text' : type;

  const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
    field.onChange(event.target.value);

  return (
    <div className={`w-full ${className ?? ''}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center rounded-xl border border-gray-300 bg-white shadow-sm transition-colors focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      >
        <input
          id={id}
          name={field.name}
          ref={field.ref}
          value={field.value}
          onChange={onChange}
          onBlur={field.onBlur}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className={`h-10 w-full bg-transparent px-3 text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500 ${isPassword ? 'pr-10' : ''}`}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:outline-none active:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-blue-800 dark:active:bg-gray-700"
            aria-label={show ? 'Hide password' : 'Show password'}
            tabIndex={disabled ? -1 : 0}
          >
            {show ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
          </button>
        )}
      </div>

      {hasError && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
          {String(fieldState.error?.message ?? '')}
        </p>
      )}
    </div>
  );
}
