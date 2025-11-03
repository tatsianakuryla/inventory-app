import { type JSX } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { MyInventoriesTable } from '../../components/MyInventoriesPageComponent/Tables/MyInventoriesTable/MyInventoriesTable';

export const MyInventoriesPage = (): JSX.Element => {
  return (
    <>
      <PageHeader title="My Inventories" />
      <MyInventoriesTable />
    </>
  );
};
