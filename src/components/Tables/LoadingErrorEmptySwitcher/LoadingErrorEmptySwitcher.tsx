import { LoadingBlock } from '../LoadingBlock/LoadingBlock';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';
import { EmptyBlock } from '../EmptyBlock/EmptyBlock';
import { type ReactElement } from 'react';
import { type ReactNode } from 'react';

type ItemsLike = { items?: unknown[] } | { users?: unknown[] } | undefined;

interface LoadingErrorEmptySwitcherProperties {
  isLoading: boolean;
  error?: Error | null;
  data?: ItemsLike;
  emptyText?: string;
  errorTitle?: string;
  children: ReactNode;
}

const hasData = (data: ItemsLike): boolean => {
  if (!data) return false;
  if ('items' in data && data.items && data.items.length > 0) return true;
  if ('users' in data && data.users && data.users.length > 0) return true;
  return false;
};

export const LoadingErrorEmptySwitcher = ({
  isLoading,
  error,
  data,
  emptyText = 'No inventories found',
  errorTitle = 'Failed to load inventories',
  children,
}: LoadingErrorEmptySwitcherProperties): ReactElement | null => {
  if (isLoading) return <LoadingBlock />;
  if (error) return <ErrorBlock title={errorTitle} message={error.message} />;
  if (!hasData(data)) return <EmptyBlock text={emptyText} />;

  return <>{children}</>;
};
