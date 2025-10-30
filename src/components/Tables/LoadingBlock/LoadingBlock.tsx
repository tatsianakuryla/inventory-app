import type { JSX } from 'react';
import { Spinner } from '../../Spinner/Spinner';

export const LoadingBlock = (): JSX.Element => {
  return (
    <div className="flex justify-center p-8">
      <Spinner />
    </div>
  );
};
