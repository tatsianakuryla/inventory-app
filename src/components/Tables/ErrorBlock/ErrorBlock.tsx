import type { JSX } from 'react';

interface ErrorBlockProperties {
  title: string;
  message?: string;
}

export const ErrorBlock = ({ title, message }: ErrorBlockProperties): JSX.Element => {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
      <p className="font-semibold">{title}</p>
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
};
