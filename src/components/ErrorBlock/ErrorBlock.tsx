import type { JSX, ReactNode } from 'react';
import { getTailWindClass } from '../../shared/helpers/helpers';
import { baseError } from './error-block.styles';

type ServerErrorProperties = {
  children?: ReactNode;
  className?: string;
};

export function ErrorBlock({
  children,
  className = '',
}: ServerErrorProperties): JSX.Element | undefined {
  if (!children) return undefined;
  return (
    <p role="alert" aria-live="polite" className={getTailWindClass(baseError, className)}>
      {children}
    </p>
  );
}
