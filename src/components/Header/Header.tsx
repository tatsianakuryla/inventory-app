import type { JSX } from 'react';
import { UserName } from './UserName/UserName';
import { SearchInput } from '../SearchInput/SearchInput';
import { ButtonLink } from '../Button/ButtonLink';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { useUserStore } from '../../stores/useUserStore';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { ThemeUpdateButton } from './ThemeUpdateButton/ThemeUpdateButton';
import { Roles } from '../../shared/constants/constants';

export const Header = (): JSX.Element => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const currentUser = useUserStore((state) => state.user);
  return (
    <div className="container">
      <UserName
        name={isAuthenticated ? (currentUser?.name ?? '') : 'Guest'}
        role={isAuthenticated ? (currentUser?.role ?? Roles.USER) : Roles.USER}
      />
      <SearchInput onDebouncedChange={() => {}} debounce={400} />
      {!isAuthenticated && (
        <>
          <ThemeUpdateButton />
          <ButtonLink href={APP_ROUTES.LOGIN}>Sign In</ButtonLink>
          <ButtonLink href={APP_ROUTES.REGISTER}>Sign Up</ButtonLink>
        </>
      )}
      {isAuthenticated && (
        <>
          <ThemeUpdateButton />
          <ButtonLink href={`/profile/${currentUser?.id ?? ''}`}>Profile</ButtonLink>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
