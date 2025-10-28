import { type JSX } from 'react';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { useLogout } from '../../hooks/auth/useLogout';

export const LogoutButton = (): JSX.Element => {
  const logout = useLogout();

  return (
    <Button
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
      title={logout.isPending ? 'Logging out…' : 'Logout'}
    >
      {logout.isPending ? <Spinner size={12} /> : 'Logout'}
    </Button>
  );
};
