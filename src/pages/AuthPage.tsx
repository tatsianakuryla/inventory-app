import { type JSX } from 'react';
import { Spinner } from '../components/Spinner/Spinner';

export const AuthPage = (): JSX.Element => {
  return (
    <div>
      <Spinner size={36} />
    </div>
  );
};
