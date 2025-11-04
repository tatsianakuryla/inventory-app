import { type JSX } from 'react';

interface InventoryCustomFieldsTabProperties {
  inventoryId: string;
}

export const InventoryCustomFieldsTab = ({
  inventoryId,
}: InventoryCustomFieldsTabProperties): JSX.Element => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Custom Fields</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Configure custom fields for items in the inventory ${inventoryId}
      </p>
    </div>
  );
};
