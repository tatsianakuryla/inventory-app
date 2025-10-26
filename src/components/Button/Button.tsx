import type { ReactNode, ButtonHTMLAttributes, JSX } from 'react';
import { getTailWindClass } from '../../shared/helpers/helpers';
import type { ComponentSize, ComponentVariant } from '../../shared/types/tailwind.types';
import { baseButton, focusRing, sizeClasses, variantClasses } from './button.styles';

export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  children?: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = baseButton,
  children = 'Click me',
  ...props
}: ButtonProperties): JSX.Element => {
  return (
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
};

Button.displayName = 'Button';
