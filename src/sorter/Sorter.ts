import { isValidDateObject } from '../shared/typeguards/typeguards';

export type SortOrder = 'asc' | 'desc';

export type SortState = {
  key: string;
  order: SortOrder;
};

type ComparableValue = string | number | boolean | bigint | Date | null | undefined;

const stringCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

export class Sorter {
  public static toggleSortOrder(currentOrder?: SortOrder): SortOrder {
    return currentOrder === 'asc' ? 'desc' : 'asc';
  }

  public static compareValues(
    aValue: ComparableValue,
    bValue: ComparableValue,
    sortOrder: SortOrder = 'asc'
  ): number {
    const sortDirection = sortOrder === 'desc' ? -1 : 1;
    const isAEmpty = aValue === undefined;
    const isBEmpty = bValue === undefined;
    if (isAEmpty && isBEmpty) return 0;
    if (isAEmpty) return 1;
    if (isBEmpty) return -1;

    const aDate = isValidDateObject(aValue) ? aValue : this.parseDate(aValue);
    const bDate = isValidDateObject(bValue) ? bValue : this.parseDate(bValue);
    if (aDate && bDate) {
      return sortDirection * (aDate.getTime() - bDate.getTime());
    }

    if (typeof aValue === 'bigint' && typeof bValue === 'bigint') {
      if (aValue === bValue) return 0;
      return sortDirection * (aValue < bValue ? -1 : 1);
    }

    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      if (aValue === bValue) return 0;
      return sortDirection * (aValue ? 1 : -1);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection * (aValue - bValue);
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection * stringCollator.compare(aValue, bValue);
    }

    return sortDirection * stringCollator.compare(String(aValue), String(bValue));
  }

  public static createComparatorBy<RowType>(
    getComparableValue: (row: RowType) => ComparableValue,
    sortOrder: SortOrder = 'asc'
  ) {
    return (firstRow: RowType, secondRow: RowType) =>
      Sorter.compareValues(getComparableValue(firstRow), getComparableValue(secondRow), sortOrder);
  }

  private static parseDate(value: unknown): Date | undefined {
    if (typeof value === 'string') {
      const timestamp = Date.parse(value);
      if (!Number.isNaN(timestamp)) return new Date(timestamp);
    }
    return undefined;
  }
}
