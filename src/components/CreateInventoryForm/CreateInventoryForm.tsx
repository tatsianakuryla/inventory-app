import type { JSX, FormEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  InventoryCreateRequestSchema,
  type InventoryCreateRequestInput,
} from '../../api/InventoryService/inventory.schemas';
import { useCreateInventory } from '../../hooks/inventories/useInventories';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';
import { NameAndCategoryRow } from './NameAndCategoryRow/NameAndCategoryRow';
import { ImageUrl } from './ImageUrl/ImageUrl';
import { DescriptionWithCounter } from './Description/Description';
import { VisibilityToggler } from './VisibilityToggler/VisibilityToggler';

export const CreateInventoryForm = (): JSX.Element => {
  const navigate = useNavigate();
  const createMutation = useCreateInventory();

  const methods = useForm<InventoryCreateRequestInput>({
    resolver: zodResolver(InventoryCreateRequestSchema),
    defaultValues: {
      name: '',
      description: '',
      isPublic: false,
      imageUrl: '',
      categoryId: undefined,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: InventoryCreateRequestInput): Promise<void> => {
    const payload = {
      ...data,
      description: data.description?.trim() ?? undefined,
      imageUrl: data.imageUrl ?? undefined,
      categoryId: data.categoryId ?? undefined,
    };
    const created = await createMutation.mutateAsync(payload);
    void navigate(APP_ROUTES.INVENTORY_VIEW.replace(':inventoryId', created.id));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createMutation.reset();
    void methods.handleSubmit(onSubmit)(event);
  };

  const isSubmitting = methods.formState.isSubmitting || createMutation.isPending;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h1 className="p-3 text-lg font-semibold text-gray-900 dark:text-gray-50">
            Create inventory
          </h1>

          <div className="flex flex-col gap-3 p-3">
            <NameAndCategoryRow disabled={isSubmitting} />
            <ImageUrl disabled={isSubmitting} />
            <DescriptionWithCounter disabled={isSubmitting} />
            <VisibilityToggler disabled={isSubmitting} />
            {createMutation.isError && <ErrorBlock>{createMutation.error?.message}</ErrorBlock>}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-3 dark:border-gray-800">
            <Button type="submit" disabled={isSubmitting} variant="primary">
              {isSubmitting ? <Spinner label="Creating" /> : 'Create Inventory'}
            </Button>
            <Button
              onClick={() => void navigate(APP_ROUTES.HOME)}
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
