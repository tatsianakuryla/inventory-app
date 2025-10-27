import { type JSX } from 'react';
import { APP_ROUTES } from '../../AppRouter/routes/routes';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { ButtonLink } from '../../components/Button/ButtonLink';

export const RegisterPage = (): JSX.Element => {
  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gray-50 dark:bg-gray-900"
      />
      <main className="grid min-h-svh place-items-center px-4">
        <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg md:p-8 dark:bg-gray-800">
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
            Registration
          </h1>
          <RegisterForm />
          <div className="mt-6 border-t border-gray-200 pt-4 text-center dark:border-gray-700">
            <span className="mr-2 text-gray-600 dark:text-gray-300">Do you have an account?</span>
            <ButtonLink href={APP_ROUTES.LOGIN} variant="link" className="font-semibold">
              Log in
            </ButtonLink>
          </div>
        </section>
      </main>
    </div>
  );
};
