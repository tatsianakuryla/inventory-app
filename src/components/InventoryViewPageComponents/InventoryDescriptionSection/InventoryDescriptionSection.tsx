import { type JSX } from 'react';
import type { Inventory } from '../../../api/InventoryService/inventory.schemas';

interface InventoryDescriptionSectionProperties {
  inventory: Inventory;
}

export const InventoryDescriptionSection = ({
  inventory,
}: InventoryDescriptionSectionProperties): JSX.Element => {
  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start gap-2 p-3">
        {inventory.imageUrl && (
          <img
            src={inventory.imageUrl}
            alt={inventory.name}
            className="h-28 w-28 rounded-lg object-cover"
          />
        )}
        <div className="flex flex-1 flex-col items-start gap-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{inventory.name}</h2>

          <p className="text-gray-600 dark:text-gray-400">
            {inventory.description || 'No description'}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span className="font-medium">Owner:</span> {inventory.owner.name}
            </span>

            <span className="flex items-center gap-1">
              <span className="font-medium">Created:</span>
              {new Date(inventory.createdAt).toLocaleDateString()}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                inventory.isPublic
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {inventory.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
