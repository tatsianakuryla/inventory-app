import { type JSX } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader/PageHeader';

export const InventoryItemsPage = (): JSX.Element => {
  const { inventoryId } = useParams<{ inventoryId: string }>();

  return (
    <>
      <PageHeader title={`Items for inventory with ID: ${inventoryId}`} />
    </>
  );
};
