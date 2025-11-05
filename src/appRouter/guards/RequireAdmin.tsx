import { type JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { APP_ROUTES } from '../routes/routes';
import { Roles, Status } from '../../shared/constants/constants';

export const RequireAdmin = (): JSX.Element => {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  if (user?.status === Status.BLOCKED) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  if (user?.role !== Roles.ADMIN) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
