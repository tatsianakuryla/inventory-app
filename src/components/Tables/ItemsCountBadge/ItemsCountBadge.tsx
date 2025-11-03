import type { JSX } from 'react';

interface ItemsCountBadgeProperties {
  value: number;
  singular?: string;
  plural?: string;
}

export const ItemsCountBadge = ({
  value,
  singular = 'item',
  plural = 'items',
}: ItemsCountBadgeProperties): JSX.Element => {
  const label = value === 1 ? singular : plural;
  return (
    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
      {value} {label}
    </span>
  );
};
