import { type JSX } from 'react';
import { Spinner } from '../components/Spinner/Spinner';
import { Button } from '../components/Button/Button';

export const AuthPage = (): JSX.Element => {
  return (
    <div>
      <Spinner size={36} />
      <Button>Login</Button>
    </div>
  );
};
