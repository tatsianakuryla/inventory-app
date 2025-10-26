import type { ReactNode, ButtonHTMLAttributes, JSX } from 'react';
import { getTailWindClass } from '../../shared/helpers/helpers';
import type { ComponentSize, ComponentVariant } from '../../shared/types/tailwind.types';

export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  children?: ReactNode;
}

const base =
  'inline-flex items-center justify-center rounded-md font-medium select-none whitespace-nowrap transition-colors cursor-pointer ' +
  'disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400/40 focus-visible:ring-offset-white ' +
  'dark:focus-visible:ring-neutral-500/40 dark:focus-visible:ring-offset-neutral-950';

const variantClasses: Record<ComponentVariant, string> = {
  primary:
    'text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-800/90 ' +
    'dark:text-emerald-950 dark:bg-emerald-200/90 dark:hover:bg-emerald-200',
  secondary:
    'text-emerald-900 bg-white border border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 ' +
    'dark:text-emerald-100 dark:bg-neutral-900 dark:border-emerald-800/60 dark:hover:bg-neutral-800 dark:active:bg-neutral-800/80',
  ghost:
    'text-emerald-800 hover:bg-emerald-50 active:bg-emerald-100/70 ' +
    'dark:text-emerald-300 dark:hover:bg-emerald-900/40 dark:active:bg-emerald-900/60',
  danger:
    'text-white bg-rose-600/90 hover:bg-rose-600 active:bg-rose-700/90 ' +
    'dark:bg-rose-500/90 dark:hover:bg-rose-500 dark:active:bg-rose-600/90',
};

const sizeClasses: Record<ComponentSize, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
  icon: 'p-2 text-sm aspect-square',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = base,
  children = 'Click me',
  ...props
}: ButtonProperties): JSX.Element => {
  return (
    <button
      type={type}
      {...props}
      className={getTailWindClass(base, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
