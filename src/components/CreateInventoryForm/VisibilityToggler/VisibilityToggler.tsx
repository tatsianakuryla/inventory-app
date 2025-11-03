import type { JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import type { InventoryCreateRequestInput } from '../../../api/InventoryService/inventory.schemas';

export function VisibilityToggler({ disabled }: { disabled?: boolean }): JSX.Element {
  const { register } = useFormContext<InventoryCreateRequestInput>();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="isPublic" className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Visibility
      </label>

      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-0.5 pr-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Make this inventory public
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Public inventories can be viewed by anyone with access.
          </p>
        </div>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id="isPublic"
            type="checkbox"
            {...register('isPublic')}
            disabled={disabled}
            className="peer sr-only"
          />
          <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-emerald-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 dark:bg-gray-700"></div>
          <div className="absolute left-0.5 top-0.5 h-5 w-5 translate-x-0 rounded-full bg-white transition peer-checked:translate-x-5 dark:bg-gray-100"></div>
        </label>
      </div>
    </div>
  );
}
