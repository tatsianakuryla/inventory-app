import type { ChangeEvent, JSX } from 'react';
import { useEffect, useState } from 'react';
import { useDebounced } from '../../hooks/useDebounce';
import { getTailWindClass } from '../../shared/helpers/helpers';
import { baseWrapper, baseInput } from './input.styles';

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

  useEffect(() => {
    if (value !== undefined) setSearchValue(value);
  }, [value]);

  const debouncedFire = useDebounced((v: string) => {
    onDebouncedChange?.(v);
  }, debounce);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setSearchValue(value);
    onChange?.(value);
    debouncedFire(value);
  }

  return (
    <div
      role="search"
      className={getTailWindClass(
        baseWrapper,
        disabled ? 'cursor-not-allowed opacity-60' : '',
        className
      )}
    >
      <input
        value={searchValue}
        type="search"
        aria-label={ariaLabel ?? 'Search'}
        className={getTailWindClass(baseInput, inputClassName)}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={!!disabled}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
}
