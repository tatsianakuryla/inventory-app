import type { JSX } from 'react';
import { badge } from './items-count-badge.styles';

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
    <span className={badge}>
      {value} {label}
    </span>
  );
};
