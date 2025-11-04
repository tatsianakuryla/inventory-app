import { type JSX } from 'react';

interface InventoryDiscussionTabProperties {
  inventoryId: string;
}

export const InventoryDiscussionTab = ({
  inventoryId,
}: InventoryDiscussionTabProperties): JSX.Element => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Discussion</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Discussion feature for inventory {inventoryId}
      </p>
    </div>
  );
};
