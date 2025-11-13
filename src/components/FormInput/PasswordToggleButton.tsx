import type { JSX } from 'react';
import { EyeIcon } from './EyeIcon';
import { EyeOffIcon } from './EyeOffIcon';
import { passwordToggleButton } from './form-input.styles';

interface PasswordToggleButtonProperties {
  showPassword: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const PasswordToggleButton = ({
  showPassword,
  onClick,
  disabled,
}: PasswordToggleButtonProperties): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={passwordToggleButton}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
};
