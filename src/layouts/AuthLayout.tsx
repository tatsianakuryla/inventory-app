import { Outlet } from 'react-router-dom';
import { type JSX } from 'react';

export const AuthLayout = (): JSX.Element => (
  <div className="grid min-h-dvh place-items-center p-4">
    <Outlet />
  </div>
);
