import { type JSX } from 'react';
import { useMatch } from 'react-router-dom';
import { ButtonLink } from '../Button/ButtonLink';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { useUserStore } from '../../stores/useUserStore';
import { Statuses } from '../../shared/types/enums';
import { Home, Plus, BookMarked, Library } from 'lucide-react';
import {
  container,
  buttonContent,
  iconSize,
  hiddenOnSmall,
  hiddenOnMedium,
  hiddenOnLarge,
  hiddenFromMediumToLarge,
  hiddenOnMediumVisible,
} from './page-buttons-group.styles';

export const PageButtonsGroup = (): JSX.Element => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const onAllInventoriesPage = Boolean(useMatch({ path: APP_ROUTES.INVENTORIES, end: true }));
  const onMyInventoriesPage = Boolean(useMatch({ path: APP_ROUTES.MY_INVENTORIES, end: true }));
  const onHomePage = Boolean(useMatch({ path: APP_ROUTES.HOME, end: true }));
  const onCreateInventoryPage = Boolean(useMatch({ path: APP_ROUTES.CREATE_INVENTORY, end: true }));

  const isBlocked = user?.status === Statuses.BLOCKED;
  const showHomeButton = !onHomePage;
  const showCreateButton = isAuthenticated && !isBlocked && !onCreateInventoryPage;
  const showMyButton = isAuthenticated && !isBlocked && !onMyInventoriesPage;
  const showAllButton = !onAllInventoriesPage;

  return (
    <div className={container}>
      {showHomeButton && (
        <ButtonLink href={APP_ROUTES.HOME} variant="secondary">
          <span className={buttonContent}>
            <Home className={iconSize} />
            <span className={hiddenOnSmall}>Home</span>
          </span>
        </ButtonLink>
      )}

      {showCreateButton && (
        <ButtonLink href={APP_ROUTES.CREATE_INVENTORY} variant="primary">
          <span className={buttonContent}>
            <Plus className={iconSize} />
            <span className={hiddenOnMedium}>Create Inventory</span>
            <span className={hiddenOnMediumVisible}>Create</span>
          </span>
        </ButtonLink>
      )}

      {showMyButton && (
        <ButtonLink href={APP_ROUTES.MY_INVENTORIES} variant="primary">
          <span className={buttonContent}>
            <BookMarked className={iconSize} />
            <span className={hiddenOnLarge}>Browse My Inventories</span>
            <span className={hiddenFromMediumToLarge}>My Inventories</span>
            <span className={hiddenOnMediumVisible}>My</span>
          </span>
        </ButtonLink>
      )}

      {showAllButton && (
        <ButtonLink href={APP_ROUTES.INVENTORIES} variant="primary">
          <span className={buttonContent}>
            <Library className={iconSize} />
            <span className={hiddenOnLarge}>Browse All Inventories</span>
            <span className={hiddenFromMediumToLarge}>All Inventories</span>
            <span className={hiddenOnMediumVisible}>All</span>
          </span>
        </ButtonLink>
      )}
    </div>
  );
};
