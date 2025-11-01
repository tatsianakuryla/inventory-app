import { type JSX } from 'react';
import { useMatch } from 'react-router-dom';
import { ButtonLink } from '../Button/ButtonLink';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { useUserStore } from '../../stores/useUserStore';

export const PageButtonsGroup = (): JSX.Element => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const onAllInventoriesPage = Boolean(useMatch({ path: APP_ROUTES.INVENTORIES, end: true }));
  const onMyInventoriesPage = Boolean(useMatch({ path: APP_ROUTES.MY_INVENTORIES, end: true }));
  const onHomePage = Boolean(useMatch({ path: APP_ROUTES.HOME, end: true }));
  const onCreateInventoryPage = Boolean(useMatch({ path: APP_ROUTES.CREATE_INVENTORY, end: true }));

  const showHomeButton = !onHomePage;
  const showCreateButton = isAuthenticated && !onCreateInventoryPage;
  const showMyButton = isAuthenticated && !onMyInventoriesPage;
  const showAllButton = !onAllInventoriesPage;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {showHomeButton && (
        <ButtonLink href={APP_ROUTES.HOME} variant="secondary">
          Home
        </ButtonLink>
      )}

      {showCreateButton && (
        <ButtonLink href={APP_ROUTES.CREATE_INVENTORY} variant="primary">
          + Create Inventory
        </ButtonLink>
      )}

      {showMyButton && (
        <ButtonLink href={APP_ROUTES.MY_INVENTORIES} variant="primary">
          Browse My Inventories
        </ButtonLink>
      )}

      {showAllButton && (
        <ButtonLink href={APP_ROUTES.INVENTORIES} variant="primary">
          Browse All Inventories
        </ButtonLink>
      )}
    </div>
  );
};
