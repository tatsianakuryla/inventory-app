import { ButtonLink } from '../../Button/ButtonLink';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { type JSX } from 'react';
import { useUserStore } from '../../../stores/useUserStore';
import { Status } from '../../../shared/constants/constants';

interface AddNewItemButtonProperties {
  canEdit: boolean;
  inventoryId?: string;
}

export const AddNewItemButton = ({
  canEdit,
  inventoryId,
}: AddNewItemButtonProperties): JSX.Element | undefined => {
  const user = useUserStore((state) => state.user);

  if (!canEdit || !inventoryId || user?.status === Status.BLOCKED) return undefined;
  return (
    <ButtonLink
      href={`${APP_ROUTES.INVENTORIES}/${inventoryId}/items/new`}
      className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:hover:bg-teal-600"
    >
      <span aria-hidden>＋</span>
      <span>Add Item</span>
    </ButtonLink>
  );
};
