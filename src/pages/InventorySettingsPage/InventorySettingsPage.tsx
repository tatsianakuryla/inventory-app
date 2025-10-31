import { type JSX } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader/PageHeader';

export const InventorySettingsPage = (): JSX.Element => {
  const { inventoryName } = useParams<{ inventoryName: string }>();

  return (
    <>
      <PageHeader title={`Inventory ${inventoryName} settings`} />
    </>
  );
};
