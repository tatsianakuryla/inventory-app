import type { JSX, ReactNode } from 'react';

type ServerErrorProperties = {
  children?: ReactNode;
  className?: string;
};

export function ServerError({
  children,
  className = '',
}: ServerErrorProperties): JSX.Element | undefined {
  if (!children) return undefined;
  return (
    <p
      role="alert"
      aria-live="polite"
      className={`text-sm text-red-600 dark:text-red-400 ${className}`}
    >
      {children}
    </p>
  );
}
