import { type JSX } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { AllInventoriesTable } from '../../components/AllInventoriesPageComponents/Tables/AllInventoriesTable/AllInventoriesTable';

export const InventoriesPage = (): JSX.Element => {
  return (
    <>
      <PageHeader title="All Inventories" />
      <AllInventoriesTable />
    </>
  );
};
