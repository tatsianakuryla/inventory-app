import type { JSX } from 'react';
import { APP_ROUTES } from '../../../appRouter/routes/routes';
import { Link } from 'react-router-dom';
import {
  container,
  imageWrapper,
  image,
  imagePlaceholder,
  link,
} from './inventory-name-cell.styles';

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
    <div className={container}>
      <div className={imageWrapper}>
        {row.imageUrl ? (
          <img src={row.imageUrl} alt={row.name} className={image} />
        ) : (
          <div className={imagePlaceholder} />
        )}
      </div>
      <Link to={`${APP_ROUTES.INVENTORIES}/${row.id}`} className={link}>
        {row.name}
      </Link>
    </div>
  );
};
