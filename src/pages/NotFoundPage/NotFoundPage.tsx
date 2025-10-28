import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { TriangleAlert } from 'lucide-react';
import { APP_ROUTES } from '../../appRouter/routes/routes';

export const NotFoundPage = (): JSX.Element => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg dark:bg-gray-800">
        <div className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
            <TriangleAlert className="h-10 w-10 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="mb-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            404 — Page not found
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to={APP_ROUTES.HOME}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            Go to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};
