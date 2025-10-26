import type { JSX } from 'react';
import { UserName } from './UserName/UserName';
import { SearchInput } from '../SearchInput/SearchInput';
import type { Theme } from '../../shared/types/main.types';
import { ButtonLink } from '../Button/ButtonLink';
import { APP_ROUTES } from '../../AppRouter/routes/routes';
import { useAuthStore } from '../../hooks/use-auth-store';

type HeaderProperties = {
  theme: Theme;
};

export const Header = ({ theme }: HeaderProperties): JSX.Element => {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <>
      <div className="container">
        <UserName name={isAuthenticated ? (user?.name ?? 'User') : 'Guest'} theme={theme} />
        <SearchInput onDebouncedChange={() => console.log('Search')} debounce={400} theme={theme} />
        {!isAuthenticated && (
          <>
            <ButtonLink href={APP_ROUTES.LOGIN} theme={theme}>
              Sign In
            </ButtonLink>
            <ButtonLink href={APP_ROUTES.REGISTER} theme={theme}>
              Sign Up
            </ButtonLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <ButtonLink href={APP_ROUTES.PROFILE} theme={theme}>
              Profile
            </ButtonLink>
            <ButtonLink href={APP_ROUTES.HOME} theme={theme}>
              Logout
            </ButtonLink>
          </>
        )}
      </div>
    </>
  );
};
