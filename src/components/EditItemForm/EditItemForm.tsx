import type { JSX, FormEvent } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetInventoryById } from '../../hooks/inventories/useInventories';
import { useGetItemById, useUpdateItem } from '../../hooks/items/useItems';
import { ItemUpdateSchema, type ItemUpdateRequest } from '../../api/ItemsService/items.schemas';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';
import { LoadingBlock } from '../Tables/LoadingBlock/LoadingBlock';
import { DynamicItemFields } from '../CreateItemForm/DynamicItemFields/DynamicItemFields';
import * as styles from './edit-item-form.styles';

export const EditItemForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { inventoryId, itemId } = useParams<{ inventoryId: string; itemId: string }>();

  const { data: inventory, isLoading: isLoadingInventory } = useGetInventoryById(inventoryId ?? '');
  const { data: item, isLoading: isLoadingItem } = useGetItemById(
    { inventoryId: inventoryId ?? '', itemId: itemId ?? '' },
    { enabled: !!inventoryId && !!itemId }
  );

  const updateMutation = useUpdateItem();

  const methods = useForm<ItemUpdateRequest>({
    resolver: zodResolver(ItemUpdateSchema),
    values: item
      ? {
          text1: item.text1 ?? undefined,
          text2: item.text2 ?? undefined,
          text3: item.text3 ?? undefined,
          long1: item.long1 ?? undefined,
          long2: item.long2 ?? undefined,
          long3: item.long3 ?? undefined,
          num1: item.num1 ?? undefined,
          num2: item.num2 ?? undefined,
          num3: item.num3 ?? undefined,
          link1: item.link1 ?? undefined,
          link2: item.link2 ?? undefined,
          link3: item.link3 ?? undefined,
          bool1: item.bool1 ?? undefined,
          bool2: item.bool2 ?? undefined,
          bool3: item.bool3 ?? undefined,
          version: item.version,
          customId: item.customId,
        }
      : undefined,
    mode: 'onTouched',
  });

  const onSubmit = async (data: ItemUpdateRequest): Promise<void> => {
    if (!inventoryId || !itemId) return;

    await updateMutation.mutateAsync({
      identifiers: { inventoryId, itemId },
      item: data,
    });

    void navigate(APP_ROUTES.INVENTORY_VIEW.replace(':inventoryId', inventoryId));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    updateMutation.reset();
    void methods.handleSubmit(onSubmit)(event);
  };

  const handleCancel = (): void => {
    if (inventoryId) {
      void navigate(APP_ROUTES.INVENTORY_VIEW.replace(':inventoryId', inventoryId));
    } else {
      void navigate(APP_ROUTES.HOME);
    }
  };

  if (isLoadingInventory || isLoadingItem) {
    return <LoadingBlock />;
  }

  if (!inventory) {
    return <ErrorBlock>Inventory not found</ErrorBlock>;
  }

  if (!item) {
    return <ErrorBlock>Item not found</ErrorBlock>;
  }

  const isSubmitting = methods.formState.isSubmitting || updateMutation.isPending;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Edit Item</h1>
            <p className={styles.subtitle}>
              in {inventory.name} • ID: {item.customId}
            </p>
          </div>

          <div className={styles.content}>
            {inventory.fields ? (
              <DynamicItemFields fields={inventory.fields} disabled={isSubmitting} />
            ) : (
              <p className={styles.emptyText}>No fields configured for this inventory</p>
            )}

            {updateMutation.isError && (
              <ErrorBlock>
                {updateMutation.error?.message ||
                  'Failed to update item. It may have been modified by another user.'}
              </ErrorBlock>
            )}
          </div>

          <div className={styles.footer}>
            <Button type="submit" disabled={isSubmitting} variant="primary">
              {isSubmitting ? <Spinner label="Saving" /> : 'Save Changes'}
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
