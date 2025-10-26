import type { ComponentSize } from '../../shared/types/tailwind.types';

export const sizeClasses: Record<
  ComponentSize,
  { root: string; input: string; icon: string; leftPad: string; rightPad: string }
> = {
  sm: { root: 'h-9', input: 'text-sm', icon: 'h-4 w-4', leftPad: 'pl-8', rightPad: 'pr-8' },
  md: { root: 'h-10', input: 'text-base', icon: 'h-5 w-5', leftPad: 'pl-10', rightPad: 'pr-10' },
  lg: { root: 'h-12', input: 'text-lg', icon: 'h-6 w-6', leftPad: 'pl-12', rightPad: 'pr-12' },
  icon: { root: 'h-10', input: 'text-base', icon: 'h-5 w-5', leftPad: 'pl-10', rightPad: 'pr-10' },
};
