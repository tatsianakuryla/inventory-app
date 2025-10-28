import { type JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { APP_ROUTES } from '../routes/routes';

export const RequireGuest = (): JSX.Element => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
