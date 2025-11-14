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
import * as styles from './create-item-form.styles';
import {
  type CustomIdFormatSchema,
  isCustomIdFormatSchema,
} from '../../shared/typeguards/typeguards';
import { DEFAULT_FIELDS_VALUES } from './create-item-form.contatns';

export const CreateItemForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { inventoryId } = useParams<{ inventoryId: string }>();
  const { data: inventory, isLoading: isLoadingInventory } = useGetInventoryById(inventoryId ?? '');
  const createMutation = useCreateItem();

  const methods = useForm<ItemCreateRequest>({
    resolver: zodResolver(ItemCreateRequestSchema),
    defaultValues: DEFAULT_FIELDS_VALUES,
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
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Add New Item</h1>
            <p className={styles.subtitle}>to {inventory.name}</p>
          </div>

          <div className={styles.content}>
            {!hasValidIdFormat && (
              <ErrorBlock>
                <p className={styles.errorTitle}>⚠️ Invalid Custom ID Format</p>
                <p className={styles.errorText}>
                  The inventory's Custom ID format must contain exactly one SEQUENCE element. Please
                  configure it in the "Custom Item IDs" tab before creating items.
                </p>
              </ErrorBlock>
            )}

            {inventory.fields ? (
              <DynamicItemFields fields={inventory.fields} disabled={isSubmitting} />
            ) : (
              <div className={styles.fieldWrapper}>
                <label className={styles.label}>
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  {...methods.register('text1', { required: 'Name is required' })}
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Enter item name"
                  className={styles.input}
                />
                {methods.formState.errors.text1 && (
                  <p className={styles.errorMessage}>{methods.formState.errors.text1.message}</p>
                )}
                <p className={styles.hint}>
                  To add additional fields, go to the "Custom Fields" tab.
                </p>
              </div>
            )}

            {createMutation.isError && <ErrorBlock>{createMutation.error?.message}</ErrorBlock>}
          </div>

          <div className={styles.footer}>
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
