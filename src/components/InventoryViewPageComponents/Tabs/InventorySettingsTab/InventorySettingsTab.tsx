import { type JSX } from 'react';
import type { InventoryDetail } from '../../../../api/InventoryService/inventory.schemas';
import { Button } from '../../../Button/Button';

interface InventorySettingsTabProperties {
  inventory: InventoryDetail;
}

export const InventorySettingsTab = ({
  inventory,
}: InventorySettingsTabProperties): JSX.Element => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Inventory Settings</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage the inventory ${inventory.id} title, description, image, category, and tags
        </p>
      </div>
      <Button variant="primary">Edit Settings</Button>
    </div>
  );
};
