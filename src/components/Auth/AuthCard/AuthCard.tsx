import type { JSX, ReactNode } from 'react';
import { ButtonLink } from '../../Button/ButtonLink';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { getTailWindClass } from '../../../shared/helpers/helpers';
import {
  cardBase,
  defaultMaxWidth,
  heading,
  descriptionClass,
  redirectionSection,
  redirectionText,
  redirectionLinkClass,
  homeLink,
} from './auth-card.styles';

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
  maxWidthClassName = defaultMaxWidth,
}: AuthCardProperties): JSX.Element {
  const headingId = 'auth-card-titleClass';

  return (
    <section
      aria-labelledby={headingId}
      className={getTailWindClass(cardBase, maxWidthClassName, className)}
    >
      <h1 id={headingId} className={heading}>
        {title}
      </h1>
      {description && <p className={descriptionClass}>{description}</p>}
      {children}
      {redirectionLink && (
        <div className={redirectionSection}>
          <span className={redirectionText}>{redirectionLink.text}</span>
          <ButtonLink href={redirectionLink.href} variant="link" className={redirectionLinkClass}>
            {redirectionLink.label}
          </ButtonLink>
        </div>
      )}
      <ButtonLink className={homeLink} variant="outline" href={APP_ROUTES.HOME}>
        Go to the Home page
      </ButtonLink>
    </section>
  );
}
