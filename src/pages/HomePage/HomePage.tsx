import { type JSX } from 'react';
import { RecentInventoriesTable } from '../../components/HomePageComponents/Tables/RecentInventoriesTable/RecentInventoriesTable';
import { PopularInventoriesTable } from '../../components/HomePageComponents/Tables/PopularInventoriesTable/PopularInventoriesTable';
import { HomePageSectionCard } from '../../components/HomePageComponents/HomePageSectionCard/HomePageSectionCard';
import { HomePageButtons } from '../../components/HomePageComponents/HomePageButtons/HomePageButtons';

export const HomePage = (): JSX.Element => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-10 lg:px-6">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          Welcome to Inventory Management System
        </h1>
        <HomePageButtons />
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
