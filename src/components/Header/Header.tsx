import type { JSX } from 'react';
import { UserName } from './UserName/UserName';
import { SearchInput } from '../SearchInput/SearchInput';
import { ButtonLink } from '../Button/ButtonLink';
import { APP_ROUTES } from '../../AppRouter/routes/routes';
import { useAuthStore } from '../../hooks/use-auth-store';

export const Header = (): JSX.Element => {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <>
      <div className="container">
        <UserName name={isAuthenticated ? (user?.name ?? 'User') : 'Guest'} />
        {/*TODO*/}
        <SearchInput onDebouncedChange={() => {}} debounce={400} />
        {!isAuthenticated && (
          <>
            <ButtonLink href={APP_ROUTES.LOGIN}>Sign In</ButtonLink>
            <ButtonLink href={APP_ROUTES.REGISTER}>Sign Up</ButtonLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <ButtonLink href={APP_ROUTES.PROFILE}>Profile</ButtonLink>
            <ButtonLink href={APP_ROUTES.HOME}>Logout</ButtonLink>
          </>
        )}
      </div>
    </>
  );
};
