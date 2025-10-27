import type { ReactNode, ButtonHTMLAttributes, JSX } from 'react';
import { getTailWindClass } from '../../shared/helpers/helpers';
import {
  baseButton,
  focusRing,
  sizeClasses,
  variantClasses,
  type ButtonVariant,
} from './button.styles';

export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizeClasses;
  variant?: ButtonVariant;
  children?: ReactNode;
}

export const Button = ({
  size = 'md',
  variant = 'primary',
  type = 'button',
  className,
  children = 'Click me',
  ...props
}: ButtonProperties): JSX.Element => (
  <button
    type={type}
    {...props}
    className={getTailWindClass(
      baseButton,
      focusRing,
      variantClasses[variant],
      sizeClasses[size],
      className
    )}
  >
    {children}
  </button>
);
