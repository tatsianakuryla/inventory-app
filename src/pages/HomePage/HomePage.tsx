import { type JSX } from 'react';
import { RecentInventoriesTable } from '../../components/HomePageComponents/Tables/RecentInventoriesTable/RecentInventoriesTable';
import { PopularInventoriesTable } from '../../components/HomePageComponents/Tables/PopularInventoriesTable/PopularInventoriesTable';
import { HomePageSectionCard } from '../../components/HomePageComponents/HomePageSectionCard/HomePageSectionCard';
import { PageHeader } from '../../components/PageHeader/PageHeader';

export const HomePage = (): JSX.Element => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 lg:px-6">
      <div className="flex flex-col gap-5">
        <PageHeader title="Welcome to Inventory Management System" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-2">
        <HomePageSectionCard title="Most Popular Inventories" titleId="popular-inventories-title">
          <PopularInventoriesTable />
        </HomePageSectionCard>

        <HomePageSectionCard title="Latest Inventories" titleId="recent-inventories-title">
          <RecentInventoriesTable />
        </HomePageSectionCard>
      </div>
    </div>
  );
};
