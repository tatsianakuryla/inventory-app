import { type JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { APP_ROUTES } from '../routes/routes';
import { Status } from '../../shared/constants/constants';

export const RequireAuth = (): JSX.Element => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  if (user?.status === Status.BLOCKED) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
