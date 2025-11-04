import { type JSX } from 'react';

interface InventoryStatisticsTabProperties {
  inventoryId: string;
}

export const InventoryStatisticsTab = ({
  inventoryId,
}: InventoryStatisticsTabProperties): JSX.Element => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Statistics</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400">Inventory ${inventoryId} statistics</p>
      </div>
    </div>
  );
};
