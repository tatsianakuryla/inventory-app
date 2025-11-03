import type { JSX } from 'react';
import { ButtonLink } from '../../Button/ButtonLink';
import { APP_ROUTES } from '../../../appRouter/routes/routes';

type InventoryNameCellRow = {
  id: string;
  name: string;
  imageUrl: string | null | undefined;
};

interface InventoryNameCellProperties {
  row: InventoryNameCellRow;
}

export const InventoryNameCell = ({ row }: InventoryNameCellProperties): JSX.Element => {
  return (
    <div className="flex items-center">
      <div className="mr-3 h-10 w-10 flex-shrink-0">
        {row.imageUrl ? (
          <img src={row.imageUrl} alt={row.name} className="h-10 w-10 rounded object-cover" />
        ) : (
          <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700" />
        )}
      </div>
      <ButtonLink href={`${APP_ROUTES.INVENTORIES}/:${row.id}`} variant="link">
        {row.name}
      </ButtonLink>
    </div>
  );
};
