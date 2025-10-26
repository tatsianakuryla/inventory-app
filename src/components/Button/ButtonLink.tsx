import type { AnchorHTMLAttributes, MouseEvent, JSX } from 'react';
import { getTailWindClass } from '../../shared/helpers/helpers';
import type { ComponentSizeWithIcon } from '../../shared/types/tailwind.types';
import { baseButton, sizeClasses, variantClasses } from './button.styles';
import { type Theme, THEMES } from '../../shared/types/main.types';

export interface ButtonLinkProperties
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  theme: Theme;
  size?: ComponentSizeWithIcon;
  disabled?: boolean;
}

export const ButtonLink = ({
  href,
  theme = THEMES.LIGHT,
  size = 'md',
  disabled,
  className,
  onClick,
  children,
  ...rest
}: ButtonLinkProperties): JSX.Element => {
  const classes = getTailWindClass(baseButton, variantClasses[theme], sizeClasses[size], className);
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
