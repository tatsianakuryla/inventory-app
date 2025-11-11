import { type JSX } from 'react';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { useLogout } from '../../hooks/auth/useLogout';
import { LogOut } from 'lucide-react';

export const LogoutButton = (): JSX.Element => {
  const logout = useLogout();

  return (
    <Button
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
      title={logout.isPending ? 'Logging out…' : 'Logout'}
    >
      <span className="flex items-center gap-2">
        {logout.isPending ? (
          <Spinner size={12} />
        ) : (
          <>
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </>
        )}
      </span>
    </Button>
  );
};
