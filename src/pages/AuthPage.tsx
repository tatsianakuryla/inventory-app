import { type JSX } from 'react';
import { Spinner } from '../components/Spinner/Spinner';
import { Button } from '../components/Button/Button';
import { ButtonLink } from '../components/Button/ButtonLink';
import { USERS_ROUTES } from '../shared/constants/constants';

export const AuthPage = (): JSX.Element => {
  return (
    <div>
      <Spinner size={36} />
      <Button>Login</Button>
      <ButtonLink href={USERS_ROUTES.LOGIN}>Logout</ButtonLink>
    </div>
  );
};
