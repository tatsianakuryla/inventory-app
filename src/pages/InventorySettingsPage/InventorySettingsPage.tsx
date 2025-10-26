import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

export const InventorySettingsPage = (): JSX.Element => {
  const { inventoryId } = useParams<{ inventoryId: string }>();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Inventory Settings</h1>
      <p>Settings for inventory with ID: {inventoryId}</p>
    </div>
  );
};
