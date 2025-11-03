import type { JSX } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import type { InventoryCreateRequestInput } from '../../../api/InventoryService/inventory.schemas';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';

export function DescriptionWithCounter({ disabled }: { disabled?: boolean }): JSX.Element {
  const methods = useFormContext<InventoryCreateRequestInput>();
  const description = useWatch({ control: methods.control, name: 'description' });
  const descriptionLength = description?.length ?? 0;
  const descriptionMax = 10_000;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          Description <span className="text-gray-500 dark:text-gray-400">(optional)</span>
        </label>

        <textarea
          id="description"
          {...methods.register('description')}
          placeholder="Any notes for collaborators"
          disabled={disabled}
          rows={5}
          className={`w-full rounded-xl border bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 ${
            methods.formState.errors.description
              ? 'border-red-400 focus:ring-2 focus:ring-red-400 dark:border-red-500 dark:focus:ring-red-600'
              : 'border-gray-300 focus:ring-2 focus:ring-emerald-500 dark:border-gray-700 dark:focus:ring-emerald-700'
          }`}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex">
          {methods.formState.errors.description && (
            <ErrorBlock>{methods.formState.errors.description.message}</ErrorBlock>
          )}
        </div>
        <p
          className={`text-xs ${
            descriptionLength > descriptionMax
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          {descriptionLength}/{descriptionMax}
        </p>
      </div>
    </div>
  );
}
