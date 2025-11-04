import { type JSX } from 'react';
import { RecentInventoriesTable } from '../../components/HomePageComponents/Tables/RecentInventoriesTable/RecentInventoriesTable';
import { PopularInventoriesTable } from '../../components/HomePageComponents/Tables/PopularInventoriesTable/PopularInventoriesTable';
import { HomePageSectionCard } from '../../components/HomePageComponents/HomePageSectionCard/HomePageSectionCard';
import { PageHeader } from '../../components/PageHeader/PageHeader';

export const HomePage = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <PageHeader title="Welcome to Inventory Management System" />
      </div>

      <div className="flex flex-col gap-4">
        <HomePageSectionCard title="Most Popular Inventories">
          <PopularInventoriesTable />
        </HomePageSectionCard>

        <HomePageSectionCard title="Latest Inventories">
          <RecentInventoriesTable />
        </HomePageSectionCard>
      </div>
    </>
  );
};
