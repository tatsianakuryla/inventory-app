import type { JSX } from 'react';
import { UserName } from './UserName/UserName';
import { SearchInput } from '../SearchInput/SearchInput';
import { ButtonLink } from '../Button/ButtonLink';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { useUserStore } from '../../stores/useUserStore';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { ThemeUpdateButton } from './ThemeUpdateButton/ThemeUpdateButton';
import { Roles } from '../../shared/types/enums';
import { UserCircle, LogIn, UserPlus } from 'lucide-react';

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
          <ButtonLink href={APP_ROUTES.LOGIN}>
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </span>
          </ButtonLink>
          <ButtonLink href={APP_ROUTES.REGISTER}>
            <span className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Up</span>
            </span>
          </ButtonLink>
        </>
      )}
      {isAuthenticated && (
        <>
          <ThemeUpdateButton />
          <ButtonLink href={`/profile/${currentUser?.id ?? ''}`}>
            <span className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </span>
          </ButtonLink>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
