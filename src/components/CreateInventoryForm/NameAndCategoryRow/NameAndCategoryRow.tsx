import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormInput } from '../../FormInput/FormInput';
import { CreatableCategorySelect } from '../CreatableCategorySelect/CreatableCategorySelect';
import type { InventoryCreateRequestInput } from '../../../api/InventoryService/inventory.schemas';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';

export function NameAndCategoryRow({ disabled }: { disabled?: boolean }): JSX.Element {
  const methods = useFormContext<InventoryCreateRequestInput>();
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="flex flex-1 flex-col gap-1">
        <FormInput
          name="name"
          label="Inventory Name"
          placeholder="Lego, pens, etc."
          disabled={disabled}
          required
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="categoryId"
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Category <span className="text-gray-500 dark:text-gray-400">(optional)</span>
          </label>

          <Controller
            name="categoryId"
            control={methods.control}
            render={({ field }) => (
              <div
                className={`rounded-xl border bg-white shadow-sm transition-colors dark:bg-gray-900 ${
                  methods.formState.errors.categoryId
                    ? 'border-red-400 dark:border-red-500'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
              >
                <CreatableCategorySelect
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </div>
            )}
          />
          {methods.formState.errors.categoryId && (
            <ErrorBlock>{methods.formState.errors.categoryId.message}</ErrorBlock>
          )}
        </div>
      </div>
    </div>
  );
}
