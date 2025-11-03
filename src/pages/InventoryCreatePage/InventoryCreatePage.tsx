import { type JSX } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { CreateInventoryForm } from '../../components/CreateInventoryForm/CreateInventoryForm';

export const InventoryCreatePage = (): JSX.Element => {
  return (
    <>
      <PageHeader />
      <CreateInventoryForm />
    </>
  );
};
