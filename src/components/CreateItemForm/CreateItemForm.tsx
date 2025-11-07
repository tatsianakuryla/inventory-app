import type { JSX, FormEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetInventoryById } from '../../hooks/inventories/useInventories';
import { useCreateItem } from '../../hooks/items/useItems';
import {
  ItemCreateRequestSchema,
  type ItemCreateRequest,
} from '../../api/ItemsService/items.schemas';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';
import { LoadingBlock } from '../Tables/LoadingBlock/LoadingBlock';
import { DynamicItemFields } from './DynamicItemFields/DynamicItemFields';
import {
  type CustomIdFormatSchema,
  isCustomIdFormatSchema,
} from '../../shared/typeguards/typeguards';

export const CreateItemForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { inventoryId } = useParams<{ inventoryId: string }>();
  const { data: inventory, isLoading: isLoadingInventory } = useGetInventoryById(inventoryId ?? '');
  const createMutation = useCreateItem();

  const methods = useForm<ItemCreateRequest>({
    resolver: zodResolver(ItemCreateRequestSchema),
    defaultValues: {
      text1: undefined,
      text2: undefined,
      text3: undefined,
      long1: undefined,
      long2: undefined,
      long3: undefined,
      num1: undefined,
      num2: undefined,
      num3: undefined,
      link1: undefined,
      link2: undefined,
      link3: undefined,
      bool1: undefined,
      bool2: undefined,
      bool3: undefined,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: ItemCreateRequest): Promise<void> => {
    if (!inventoryId) return;

    await createMutation.mutateAsync({
      inventoryId,
      item: data,
    });

    void navigate(APP_ROUTES.INVENTORY_VIEW.replace(':inventoryId', inventoryId));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createMutation.reset();
    void methods.handleSubmit(onSubmit)(event);
  };

  const handleCancel = (): void => {
    if (inventoryId) {
      void navigate(APP_ROUTES.INVENTORY_VIEW.replace(':inventoryId', inventoryId));
    } else {
      void navigate(APP_ROUTES.HOME);
    }
  };

  if (isLoadingInventory) {
    return <LoadingBlock />;
  }

  if (!inventory) {
    return <ErrorBlock>Inventory not found</ErrorBlock>;
  }

  const isSubmitting = methods.formState.isSubmitting || createMutation.isPending;

  const rawSchema: unknown = inventory.InventoryIdFormat?.schema;
  const formatSchema: CustomIdFormatSchema | undefined = isCustomIdFormatSchema(rawSchema)
    ? rawSchema
    : undefined;

  const sequenceCount: number = formatSchema
    ? formatSchema.elements.filter((element) => element.type === 'SEQUENCE').length
    : 0;

  const hasValidIdFormat: boolean = sequenceCount === 1;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="border-b border-gray-200 p-4 dark:border-gray-800">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Add New Item</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">to {inventory.name}</p>
          </div>

          <div className="flex flex-col gap-4 p-4">
            {!hasValidIdFormat && (
              <ErrorBlock>
                <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                  ⚠️ Invalid Custom ID Format
                </p>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  The inventory's Custom ID format must contain exactly one SEQUENCE element. Please
                  configure it in the "Custom Item IDs" tab before creating items.
                </p>
              </ErrorBlock>
            )}

            {inventory.fields ? (
              <DynamicItemFields fields={inventory.fields} disabled={isSubmitting} />
            ) : (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...methods.register('text1', { required: 'Name is required' })}
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Enter item name"
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-teal-400"
                />
                {methods.formState.errors.text1 && (
                  <p className="text-xs text-red-500">{methods.formState.errors.text1.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  To add additional fields, go to the "Custom Fields" tab.
                </p>
              </div>
            )}

            {createMutation.isError && <ErrorBlock>{createMutation.error?.message}</ErrorBlock>}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-4 dark:border-gray-800">
            <Button type="submit" disabled={isSubmitting || !hasValidIdFormat} variant="primary">
              {isSubmitting ? <Spinner label="Creating" /> : 'Create Item'}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
