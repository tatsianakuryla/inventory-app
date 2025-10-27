import type { AnchorHTMLAttributes, MouseEvent, JSX } from 'react';
import { Link } from 'react-router-dom';
import { getTailWindClass } from '../../shared/helpers/helpers';
import {
  baseButton,
  focusRing,
  sizeClasses,
  variantClasses,
  type ButtonVariant,
} from './button.styles';

export interface ButtonLinkProperties
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  size?: keyof typeof sizeClasses;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const ButtonLink = ({
  href,
  size = 'md',
  variant = 'primary',
  disabled,
  className,
  onClick,
  children,
  ...rest
}: ButtonLinkProperties): JSX.Element => {
  const classes = getTailWindClass(
    baseButton,
    focusRing,
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
    <Link
      to={href}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : rest.tabIndex}
      onMouseDown={(event) => disabled && event.preventDefault()}
      className={classes}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
};
