import type { JSX } from 'react';

export function DividerOr({ label = 'or' }: { label?: string }): JSX.Element {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-200 dark:border-gray-700" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-xs tracking-wider text-gray-500 uppercase dark:bg-gray-800 dark:text-gray-400">
          {label}
        </span>
      </div>
    </div>
  );
}
