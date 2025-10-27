import { Outlet } from 'react-router-dom';
import { type JSX } from 'react';

export const AuthLayout = (): JSX.Element => (
  <div>
    <Outlet />
  </div>
);
