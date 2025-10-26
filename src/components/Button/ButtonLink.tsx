import type { AnchorHTMLAttributes, MouseEvent, JSX } from 'react';
import { getTailWindClass } from '../../shared/helpers/helpers';
import type { ComponentVariant, ComponentSize } from '../../shared/types/tailwind.types';
import { baseButton, sizeClasses, variantClasses } from './button.styles';

export interface ButtonLinkProperties
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
}

export const ButtonLink = ({
  href,
  variant = 'primary',
  size = 'md',
  disabled,
  className,
  onClick,
  children,
  ...rest
}: ButtonLinkProperties): JSX.Element => {
  const classes = getTailWindClass(
    baseButton,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };
  return (
    <a
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : rest.tabIndex}
      className={classes}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
};

ButtonLink.displayName = 'ApiButtonLink';
