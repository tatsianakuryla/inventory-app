import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

export const InventoryItemsPage = (): JSX.Element => {
  const { inventoryId } = useParams<{ inventoryId: string }>();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Inventory Items</h1>
      <p>Items for inventory with ID: {inventoryId}</p>
    </div>
  );
};
