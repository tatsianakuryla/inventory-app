import { type JSX } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Sorter } from '../../../sorter/Sorter';

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
      className="flex w-full items-center gap-1 text-left hover:text-gray-700 dark:hover:text-gray-200"
      title={`Sort by ${label}${isActive && order ? ` (${order})` : ''}`}
    >
      <span>{label}</span>
      {isActive ? (
        order === 'asc' ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )
      ) : (
        <ChevronsUpDown className="h-4 w-4 opacity-40" />
      )}
    </button>
  );
};
