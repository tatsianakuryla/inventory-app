import type { JSX } from 'react';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { Link } from 'react-router-dom';

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
      <Link
        to={`${APP_ROUTES.INVENTORIES}/${row.id}`}
        className="text-teal-600 hover:text-teal-800 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
      >
        {row.name}
      </Link>
    </div>
  );
};
