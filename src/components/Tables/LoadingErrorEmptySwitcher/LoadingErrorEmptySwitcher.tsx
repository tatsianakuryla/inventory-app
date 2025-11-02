import { LoadingBlock } from '../LoadingBlock/LoadingBlock';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';
import { EmptyBlock } from '../EmptyBlock/EmptyBlock';
import { type ReactElement } from 'react';
import { type ReactNode } from 'react';

type ItemsLike = { items?: unknown[] } | undefined;

interface LoadingErrorEmptySwitcherProperties {
  isLoading: boolean;
  error?: Error | null;
  data?: ItemsLike;
  emptyText?: string;
  errorTitle?: string;
  children: ReactNode;
}

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
  if (!data?.items || data.items.length === 0) return <EmptyBlock text={emptyText} />;

  return <>{children}</>;
};
