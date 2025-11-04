import { type JSX } from 'react';

interface InventoryAccessTabProperties {
  inventoryId: string;
}

export const InventoryAccessTab = ({ inventoryId }: InventoryAccessTabProperties): JSX.Element => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Access Management</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Manage who can view and edit the inventory ${inventoryId}
      </p>
    </div>
  );
};
