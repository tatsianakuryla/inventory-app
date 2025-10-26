import { THEMES } from '../../shared/types/main.types';

export const baseWrapper =
  'relative flex items-center rounded-xl border shadow-sm transition-colors focus-within:ring-2';

export const themeWrapper: Record<THEMES, string> = {
  [THEMES.LIGHT]: 'bg-white border-gray-300 focus-within:ring-blue-500',
  [THEMES.DARK]: 'bg-gray-900 border-gray-700 focus-within:ring-blue-500',
};

export const baseInput = 'w-full bg-transparent outline-none px-3 h-10';

export const themeInput: Record<THEMES, string> = {
  [THEMES.LIGHT]: 'text-gray-900 placeholder:text-gray-400',
  [THEMES.DARK]: 'text-gray-100 placeholder:text-gray-500',
};
