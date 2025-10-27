import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';

export function AuthLayout(): JSX.Element {
  return (
    <div className="relative">
      <div aria-hidden className="fixed inset-0 -z-10 bg-gray-50 dark:bg-gray-900" />
      <main className="grid min-h-dvh place-items-center px-4">
        <Outlet />
      </main>
    </div>
  );
}
