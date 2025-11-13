import { type JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { APP_ROUTES } from '../routes/routes';
import { Statuses } from '../../shared/types/enums';

export const RequireAuth = (): JSX.Element => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  if (user?.status === Statuses.BLOCKED) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
