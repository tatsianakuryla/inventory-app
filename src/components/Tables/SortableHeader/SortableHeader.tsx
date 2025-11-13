import { type JSX } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Sorter } from '../../../sorter/Sorter';
import { button, iconSize, inactiveIcon } from './sortable-header.styles';

export type SortOrder = 'asc' | 'desc';

interface SortableHeaderProperties {
  label: string;
  isActive: boolean;
  order?: SortOrder;
  onClick: (nextOrder: SortOrder) => void;
}

export const SortableHeader = ({
  label,
  isActive,
  order,
  onClick,
}: SortableHeaderProperties): JSX.Element => {
  const handleClick = (): void => onClick(isActive ? Sorter.toggleSortOrder(order) : 'asc');

  const ariaSort = isActive ? (order === 'asc' ? 'ascending' : 'descending') : 'none';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-sort={ariaSort}
      className={button}
      title={`Sort by ${label}${isActive && order ? ` (${order})` : ''}`}
    >
      <span>{label}</span>
      {isActive ? (
        order === 'asc' ? (
          <ChevronUp className={iconSize} />
        ) : (
          <ChevronDown className={iconSize} />
        )
      ) : (
        <ChevronsUpDown className={inactiveIcon} />
      )}
    </button>
  );
};
