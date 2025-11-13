import { type JSX } from 'react';
import { container, textClass } from './empty-block.styles';

export const EmptyBlock = ({ text = 'No data found' }: { text?: string }): JSX.Element => {
  return (
    <div className={container}>
      <p className={textClass}>{text}</p>
    </div>
  );
};
