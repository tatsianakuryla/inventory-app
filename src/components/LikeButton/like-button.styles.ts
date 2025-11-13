export type LikeButtonSize = 'sm' | 'md' | 'lg';

export const baseButton =
  'inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors ' +
  'hover:bg-gray-100 dark:hover:bg-gray-800 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

export const likedColor = 'textClass-red-600 dark:textClass-red-400';
export const unlikedColor = 'textClass-gray-500 dark:textClass-gray-400';

export const iconSizeClasses: Record<LikeButtonSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export const textSizeClasses: Record<LikeButtonSize, string> = {
  sm: 'textClass-xs',
  md: 'textClass-sm',
  lg: 'textClass-base',
};

export const fillCurrent = 'fill-current';
export const fontMedium = 'font-medium';
