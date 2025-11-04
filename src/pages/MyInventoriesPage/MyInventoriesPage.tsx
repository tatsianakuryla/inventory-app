import { type JSX, useState } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { MyInventoriesTable } from '../../components/MyInventoriesPageComponent/Tables/MyInventoriesTable/MyInventoriesTable';
import { WriteAccessInventoriesTable } from '../../components/MyInventoriesPageComponent/Tables/WriteAccessInventoriesTable/WriteAccessInventoriesTable';
import { Tabs } from '../../components/Tabs/Tabs';

export const MyInventoriesPage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('owned');

  const tabs = [
    {
      id: 'owned',
      label: 'Inventories I Own',
      content: <MyInventoriesTable />,
    },
    {
      id: 'write-access',
      label: 'Inventories I Can Edit',
      content: <WriteAccessInventoriesTable />,
    },
  ];

  return (
    <>
      <PageHeader title="My Personal Dashboard" />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
};
