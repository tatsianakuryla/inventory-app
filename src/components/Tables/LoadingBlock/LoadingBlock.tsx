import type { JSX } from 'react';
import { Spinner } from '../../Spinner/Spinner';
import { container } from './loading-block.styles';

export const LoadingBlock = (): JSX.Element => {
  return (
    <div className={container}>
      <Spinner />
    </div>
  );
};
