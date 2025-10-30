import type { JSX } from 'react';
import { UserName } from './UserName/UserName';
import { SearchInput } from '../SearchInput/SearchInput';
import { ButtonLink } from '../Button/ButtonLink';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { useAuthStore } from '../../stores/useAuthStore';
import { LogoutButton } from '../LogoutButton/LogoutButton';

export const Header = (): JSX.Element => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useAuthStore((state) => state.user);
  return (
    <div className="container">
      <UserName name={isAuthenticated ? (currentUser?.name ?? 'User') : 'Guest'} />
      <SearchInput onDebouncedChange={() => {}} debounce={400} />
      {!isAuthenticated && (
        <>
          <ButtonLink href={APP_ROUTES.LOGIN}>Sign In</ButtonLink>
          <ButtonLink href={APP_ROUTES.REGISTER}>Sign Up</ButtonLink>
        </>
      )}
      {isAuthenticated && (
        <>
          <ButtonLink href={`/profile/${currentUser?.id ?? ''}`}>Profile</ButtonLink>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
