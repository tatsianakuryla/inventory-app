import type { ChangeEvent, JSX } from 'react';
import { useState } from 'react';
import { useDebounced } from '../../hooks/use-debounce';
import { getTailWindClass } from '../../shared/helpers/helpers';

export interface SearchInputProperties {
  value?: string;
  onChange?: (value: string) => void;
  onDebouncedChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  debounce?: number;
  className?: string;
  inputClassName?: string;
  ariaLabel?: string;
}

export function SearchInput({
  value,
  onChange,
  onDebouncedChange,
  placeholder = 'Search…',
  disabled,
  debounce = 0,
  className = '',
  inputClassName = '',
  ariaLabel,
}: SearchInputProperties): JSX.Element {
  const [searchValue, setSearchValue] = useState(value ?? '');

  const debouncedFire = useDebounced((value: string) => {
    onDebouncedChange?.(value);
  }, debounce);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setSearchValue(value);
    onChange?.(value);
    debouncedFire(value);
  }

  const wrapperStyleClass =
    'relative flex items-center rounded-xl border bg-white shadow-sm border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-colors dark:border-gray-700 dark:bg-gray-900';
  const inputStyleClass =
    'w-full bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 px-3 h-10';

  return (
    <div
      role="search"
      className={getTailWindClass(
        wrapperStyleClass,
        disabled ? 'cursor-not-allowed opacity-60' : '',
        className
      )}
    >
      <input
        value={searchValue}
        type="search"
        aria-label={ariaLabel ?? 'Search'}
        className={getTailWindClass(inputStyleClass, inputClassName)}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
}
