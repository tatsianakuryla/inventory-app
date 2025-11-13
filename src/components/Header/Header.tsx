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
import { container, buttonContent, iconSize, hiddenOnSmall } from './header.styles';

export const Header = (): JSX.Element => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const currentUser = useUserStore((state) => state.user);
  return (
    <div className={container}>
      <UserName
        name={isAuthenticated ? (currentUser?.name ?? '') : 'Guest'}
        role={isAuthenticated ? (currentUser?.role ?? Roles.USER) : Roles.USER}
      />
      <SearchInput onDebouncedChange={() => {}} debounce={400} />
      {!isAuthenticated && (
        <>
          <ThemeUpdateButton />
          <ButtonLink href={APP_ROUTES.LOGIN}>
            <span className={buttonContent}>
              <LogIn className={iconSize} />
              <span className={hiddenOnSmall}>Sign In</span>
            </span>
          </ButtonLink>
          <ButtonLink href={APP_ROUTES.REGISTER}>
            <span className={buttonContent}>
              <UserPlus className={iconSize} />
              <span className={hiddenOnSmall}>Sign Up</span>
            </span>
          </ButtonLink>
        </>
      )}
      {isAuthenticated && (
        <>
          <ThemeUpdateButton />
          <ButtonLink href={`/profile/${currentUser?.id ?? ''}`}>
            <span className={buttonContent}>
              <UserCircle className={iconSize} />
              <span className={hiddenOnSmall}>Profile</span>
            </span>
          </ButtonLink>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
