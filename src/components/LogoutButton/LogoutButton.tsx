import { type JSX } from 'react';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { useLogout } from '../../hooks/auth/useLogout';
import { LogOut } from 'lucide-react';
import { buttonContent, iconSize, labelHidden } from './logout-button.styles';

export const LogoutButton = (): JSX.Element => {
  const logout = useLogout();

  return (
    <Button
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
      title={logout.isPending ? 'Logging out…' : 'Logout'}
    >
      <span className={buttonContent}>
        {logout.isPending ? (
          <Spinner size={12} />
        ) : (
          <>
            <LogOut className={iconSize} />
            <span className={labelHidden}>Logout</span>
          </>
        )}
      </span>
    </Button>
  );
};
