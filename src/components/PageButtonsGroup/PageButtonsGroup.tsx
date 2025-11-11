import { type JSX } from 'react';
import { useMatch } from 'react-router-dom';
import { ButtonLink } from '../Button/ButtonLink';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { useUserStore } from '../../stores/useUserStore';
import { Status } from '../../shared/constants/constants';
import { Home, Plus, BookMarked, Library } from 'lucide-react';

export const PageButtonsGroup = (): JSX.Element => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const onAllInventoriesPage = Boolean(useMatch({ path: APP_ROUTES.INVENTORIES, end: true }));
  const onMyInventoriesPage = Boolean(useMatch({ path: APP_ROUTES.MY_INVENTORIES, end: true }));
  const onHomePage = Boolean(useMatch({ path: APP_ROUTES.HOME, end: true }));
  const onCreateInventoryPage = Boolean(useMatch({ path: APP_ROUTES.CREATE_INVENTORY, end: true }));

  const isBlocked = user?.status === Status.BLOCKED;
  const showHomeButton = !onHomePage;
  const showCreateButton = isAuthenticated && !isBlocked && !onCreateInventoryPage;
  const showMyButton = isAuthenticated && !isBlocked && !onMyInventoriesPage;
  const showAllButton = !onAllInventoriesPage;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {showHomeButton && (
        <ButtonLink href={APP_ROUTES.HOME} variant="secondary">
          <span className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </span>
        </ButtonLink>
      )}

      {showCreateButton && (
        <ButtonLink href={APP_ROUTES.CREATE_INVENTORY} variant="primary">
          <span className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">Create Inventory</span>
            <span className="md:hidden">Create</span>
          </span>
        </ButtonLink>
      )}

      {showMyButton && (
        <ButtonLink href={APP_ROUTES.MY_INVENTORIES} variant="primary">
          <span className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            <span className="hidden lg:inline">Browse My Inventories</span>
            <span className="hidden md:inline lg:hidden">My Inventories</span>
            <span className="md:hidden">My</span>
          </span>
        </ButtonLink>
      )}

      {showAllButton && (
        <ButtonLink href={APP_ROUTES.INVENTORIES} variant="primary">
          <span className="flex items-center gap-2">
            <Library className="h-4 w-4" />
            <span className="hidden lg:inline">Browse All Inventories</span>
            <span className="hidden md:inline lg:hidden">All Inventories</span>
            <span className="md:hidden">All</span>
          </span>
        </ButtonLink>
      )}
    </div>
  );
};
