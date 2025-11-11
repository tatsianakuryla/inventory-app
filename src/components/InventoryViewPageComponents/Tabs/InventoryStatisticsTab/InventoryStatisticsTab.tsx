import { type JSX } from 'react';
import { useGetInventoryStatistics } from '../../../../hooks/inventories/useInventories';
import { BarChart3, Calendar, Hash, TrendingUp } from 'lucide-react';
import { useGetInventoryById } from '../../../../hooks/inventories/useInventories';
import { isFieldKey } from '../../../../shared/typeguards/typeguards';
import { NAME_KEYS, STATE_KEYS } from '../../../../api/InventoryService/inventory.schemas';

interface InventoryStatisticsTabProperties {
  inventoryId: string;
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const InventoryStatisticsTab = ({
  inventoryId,
}: InventoryStatisticsTabProperties): JSX.Element => {
  const { data: statistics, isLoading, error } = useGetInventoryStatistics(inventoryId);
  const { data: inventory } = useGetInventoryById(inventoryId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">Failed to load statistics</p>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">No statistics available</p>
        </div>
      </div>
    );
  }

  const getFieldName = (fieldKey: string): string => {
    if (!inventory?.fields || !isFieldKey(fieldKey)) return fieldKey;
    const nameKey = NAME_KEYS[fieldKey];
    const customName = inventory.fields[nameKey];
    return typeof customName === 'string' && customName ? customName : fieldKey;
  };

  const isFieldShown = (fieldKey: string): boolean => {
    if (!inventory?.fields || !isFieldKey(fieldKey)) return false;
    const stateKey = STATE_KEYS[fieldKey];
    return inventory.fields[stateKey] === 'SHOWN';
  };

  const visibleNumericFields = Object.entries(statistics.numericFields).filter(([fieldKey]) =>
    isFieldShown(fieldKey)
  );

  const visibleTextFields = Object.entries(statistics.textFields).filter(([fieldKey]) =>
    isFieldShown(fieldKey)
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Statistics</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
              <Hash className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-bold">{statistics.itemsCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
              <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">First Item</p>
              <p className="text-lg font-semibold">{formatDate(statistics.firstItemCreatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Item</p>
              <p className="text-lg font-semibold">{formatDate(statistics.lastItemCreatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {visibleNumericFields.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5" />
            Numeric Fields Statistics
          </h3>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {visibleNumericFields.map(([fieldKey, stats]) => (
              <div
                key={fieldKey}
                className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <h4 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
                  {getFieldName(fieldKey)}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900/50">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Average</p>
                    <p className="text-lg font-semibold">
                      {stats.avg === null ? 'N/A' : stats.avg.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900/50">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Count</p>
                    <p className="text-lg font-semibold">{stats.count}</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900/50">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Minimum</p>
                    <p className="text-lg font-semibold">
                      {stats.min === null ? 'N/A' : stats.min}
                    </p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900/50">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Maximum</p>
                    <p className="text-lg font-semibold">
                      {stats.max === null ? 'N/A' : stats.max}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleTextFields.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <BarChart3 className="h-5 w-5" />
            Text Fields Statistics
          </h3>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {visibleTextFields.map(([fieldKey, items]) => (
              <div
                key={fieldKey}
                className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <h4 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
                  {getFieldName(fieldKey)}
                </h4>
                <div className="space-y-2">
                  {items.length > 0 ? (
                    items.slice(0, 5).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-900/50"
                      >
                        <span className="truncate text-sm font-medium">{item.value}</span>
                        <span className="ml-2 flex-shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                          {item.count}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
                  )}
                  {items.length > 5 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      +{items.length - 5} more values
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {statistics.itemsCount === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <BarChart3 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            No Statistics Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add items to this inventory to see statistics
          </p>
        </div>
      )}
    </div>
  );
};
