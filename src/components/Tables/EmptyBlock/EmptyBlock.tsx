import { type JSX } from 'react';

export const EmptyBlock = ({ text = 'No data found' }: { text?: string }): JSX.Element => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
      <p className="text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  );
};
