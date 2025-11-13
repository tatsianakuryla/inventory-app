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
import * as styles from './create-inventory-form.styles';

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
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.card}>
          <h1 className={styles.header}>Create inventory</h1>

          <div className={styles.content}>
            <NameAndCategoryRow disabled={isSubmitting} />
            <ImageUrl disabled={isSubmitting} />
            <DescriptionWithCounter disabled={isSubmitting} />
            <VisibilityToggler disabled={isSubmitting} />
            {createMutation.isError && <ErrorBlock>{createMutation.error?.message}</ErrorBlock>}
          </div>

          <div className={styles.footer}>
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
