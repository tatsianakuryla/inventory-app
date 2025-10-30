import { type JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { APP_ROUTES } from '../routes/routes';

export const RequireAdmin = (): JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
