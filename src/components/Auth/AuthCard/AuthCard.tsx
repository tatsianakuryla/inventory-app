import type { JSX, ReactNode } from 'react';
import { ButtonLink } from '../../Button/ButtonLink';
import { APP_ROUTES } from '../../../appRouter/routes/routes';

type RedirectionLink = { text: string; href: string; label: string };

type AuthCardProperties = {
  title: string;
  description?: string;
  children: ReactNode;
  redirectionLink?: RedirectionLink;
  className?: string;
  maxWidthClassName?: string;
};

export function AuthCard({
  title,
  description,
  children,
  redirectionLink,
  className = '',
  maxWidthClassName = 'max-w-md',
}: AuthCardProperties): JSX.Element {
  const headingId = 'auth-card-title';

  return (
    <section
      aria-labelledby={headingId}
      className={`w-full ${maxWidthClassName} rounded-2xl bg-white p-6 shadow-lg md:p-8 dark:bg-gray-800 ${className}`}
    >
      <h1
        id={headingId}
        className="mb-2 text-center text-2xl font-semibold text-gray-900 dark:text-white"
      >
        {title}
      </h1>
      {description && (
        <p className="mb-4 text-center text-gray-600 dark:text-gray-300">{description}</p>
      )}
      {children}
      {redirectionLink && (
        <div className="mt-6 border-t border-gray-200 pt-4 text-center dark:border-gray-700">
          <span className="mr-2 text-gray-600 dark:text-gray-300">{redirectionLink.text}</span>
          <ButtonLink href={redirectionLink.href} variant="link" className="font-semibold">
            {redirectionLink.label}
          </ButtonLink>
        </div>
      )}
      <ButtonLink className="mt-3" variant="outline" href={APP_ROUTES.HOME}>
        Go to the Home page
      </ButtonLink>
    </section>
  );
}
