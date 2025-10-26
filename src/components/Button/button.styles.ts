import type { ComponentSizeWithIcon } from '../../shared/types/tailwind.types';
import { THEMES } from '../../shared/types/main.types';

export const baseButton =
  'inline-flex items-center justify-center rounded-md font-medium select-none whitespace-nowrap ' +
  'transition-colors enabled:cursor-pointer ' +
  'disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed';

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-neutral-400/40 focus-visible:ring-offset-white ' +
  'dark:focus-visible:ring-neutral-500/40 dark:focus-visible:ring-offset-neutral-950';

export const variantClasses: Record<THEMES, string> = {
  [THEMES.LIGHT]:
    'text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-800/90 ' +
    'ring-1 ring-emerald-800/15',
  [THEMES.DARK]:
    'text-emerald-950 bg-emerald-200/90 hover:bg-emerald-200 active:bg-emerald-300/90 ' +
    'ring-1 ring-emerald-300/25',
};

export const sizeClasses: Record<ComponentSizeWithIcon, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
  icon: 'p-2 text-sm aspect-square',
};
