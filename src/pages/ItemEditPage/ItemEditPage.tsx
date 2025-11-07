import { type JSX } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { EditItemForm } from '../../components/EditItemForm/EditItemForm';

export const ItemEditPage = (): JSX.Element => {
  return (
    <>
      <PageHeader />
      <EditItemForm />
    </>
  );
};
