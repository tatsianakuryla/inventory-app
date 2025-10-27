export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link';

export const baseButton =
  'inline-flex items-center justify-center rounded-md font-medium select-none whitespace-nowrap ' +
  'transition-colors enabled:cursor-pointer ' +
  'disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed';

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-neutral-400/40 focus-visible:ring-offset-white ' +
  'dark:focus-visible:ring-neutral-500/40 dark:focus-visible:ring-offset-neutral-950';

export const sizeClasses = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
  icon: 'p-2 text-sm aspect-square',
} as const;

export const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-800/90 ring-1 ring-emerald-800/15 ' +
    'dark:text-emerald-950 dark:bg-emerald-200/90 dark:hover:bg-emerald-200 dark:active:bg-emerald-300/90 dark:ring-emerald-300/25',

  secondary:
    'text-gray-900 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 ring-1 ring-black/5 ' +
    'dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 dark:ring-white/10',

  ghost:
    'text-gray-700 hover:bg-gray-100 active:bg-gray-200 ring-1 ring-transparent ' +
    'dark:text-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700',

  outline:
    'text-gray-900 bg-transparent ring-1 ring-gray-300 hover:bg-gray-50 active:bg-gray-100 ' +
    'dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-800 dark:active:bg-gray-700',

  destructive:
    'text-white bg-red-600 hover:bg-red-700 active:bg-red-800 ring-1 ring-red-600/20 ' +
    'dark:text-red-950 dark:bg-red-300 dark:hover:bg-red-200 dark:active:bg-red-400 dark:ring-red-300/30',

  link:
    'p-0 h-auto text-emerald-700 underline underline-offset-4 hover:no-underline ring-0 bg-transparent ' +
    'dark:text-emerald-300',
};
