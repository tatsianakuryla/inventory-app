import type { ReactNode, ButtonHTMLAttributes, JSX } from 'react';
import { getTailWindClass } from '../../shared/helpers/helpers';
import type { ComponentSizeWithIcon } from '../../shared/types/tailwind.types';
import { baseButton, focusRing, sizeClasses, variantClasses } from './button.styles';
import { type Theme, THEMES } from '../../shared/types/main.types';

export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: Theme;
  size?: ComponentSizeWithIcon;
  children?: ReactNode;
}

export const Button = ({
  theme = THEMES.LIGHT,
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
        variantClasses[theme],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
