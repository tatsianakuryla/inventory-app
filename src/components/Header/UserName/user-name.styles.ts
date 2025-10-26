import type { ComponentSize } from '../../../shared/types/tailwind.types';
import { type Theme, THEMES } from '../../../shared/types/main.types';

export const baseUser = 'inline-flex items-center text-gray-900 dark:text-gray-100 mr-auto';

export const containerGapBySize: Record<ComponentSize, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-3.5',
};

export const circleBySize: Record<ComponentSize, string> = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
};

export const initialTextBySize: Record<ComponentSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const avatarThemeClasses: Record<Theme, string> = {
  [THEMES.LIGHT]: 'bg-emerald-700 text-white ring-1 ring-emerald-700/20',
  [THEMES.DARK]: 'bg-emerald-200 text-emerald-950 ring-1 ring-emerald-300/30',
};
