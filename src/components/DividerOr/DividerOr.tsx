import type { JSX } from 'react';
import { container, lineWrapper, line, labelWrapper, labelStyle } from './divider-or.styles';

export function DividerOr({ label = 'or' }: { label?: string }): JSX.Element {
  return (
    <div className={container}>
      <div className={lineWrapper}>
        <span className={line} />
      </div>
      <div className={labelWrapper}>
        <span className={labelStyle}>{label}</span>
      </div>
    </div>
  );
}
