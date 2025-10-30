import { type JSX } from 'react';
import { ButtonLink } from '../../Button/ButtonLink';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { useAuthStore } from '../../../stores/useAuthStore';

export const HomePageButtons = (): JSX.Element => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (
    <div className="mt-4 flex flex-wrap gap-3">
      <ButtonLink href={APP_ROUTES.CREATE_INVENTORY} variant="primary">
        + Create Inventory
      </ButtonLink>
      <ButtonLink href={APP_ROUTES.MY_INVENTORIES} variant="primary">
        Browse My Inventories
      </ButtonLink>
      <ButtonLink href={APP_ROUTES.INVENTORIES} variant="primary">
        Browse All Inventories
      </ButtonLink>
    </div>
  ) : (
    <div className="font- mt-4 flex flex-wrap gap-3">
      <ButtonLink href={APP_ROUTES.INVENTORIES} variant="primary">
        Browse All Inventories
      </ButtonLink>
    </div>
  );
};
