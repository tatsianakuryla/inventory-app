import { ButtonLink } from '../../Button/ButtonLink';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { type JSX } from 'react';
import { useUserStore } from '../../../stores/useUserStore';
import { Statuses } from '../../../shared/types/enums';
import { button } from './add-new-item-button.styles';

interface AddNewItemButtonProperties {
  canEdit: boolean;
  inventoryId?: string;
}

export const AddNewItemButton = ({
  canEdit,
  inventoryId,
}: AddNewItemButtonProperties): JSX.Element | undefined => {
  const user = useUserStore((state) => state.user);

  if (!canEdit || !inventoryId || user?.status === Statuses.BLOCKED) return undefined;
  return (
    <ButtonLink href={`${APP_ROUTES.INVENTORIES}/${inventoryId}/items/new`} className={button}>
      <span aria-hidden>＋</span>
      <span>Add Item</span>
    </ButtonLink>
  );
};
