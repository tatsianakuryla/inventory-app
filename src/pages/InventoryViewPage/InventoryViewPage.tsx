import { type JSX, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { useCanEditInventory, useGetInventoryById } from '../../hooks/inventories/useInventories';
import { useUserStore } from '../../stores/useUserStore';
import { Tabs } from '../../components/Tabs/Tabs';
import { InventoryItemsTab } from '../../components/InventoryViewPageComponents/Tabs/InventoryItemsTab/InventoryItemsTab';
import { InventoryDiscussionTab } from '../../components/InventoryViewPageComponents/Tabs/InventoryDiscussionTab/InventoryDiscussionTab';
import { InventorySettingsTab } from '../../components/InventoryViewPageComponents/Tabs/InventorySettingsTab/InventorySettingsTab';
import { InventoryAccessTab } from '../../components/InventoryViewPageComponents/Tabs/InventoryAccessTab/InventoryAccessTab';
import { InventoryCustomFieldsTab } from '../../components/InventoryViewPageComponents/Tabs/InventoryCustomFieldsTab/InventoryCustomFieldsTab';
import { InventoryStatisticsTab } from '../../components/InventoryViewPageComponents/Tabs/InventoryStatisticsTab/InventoryStatisticsTab';

export const InventoryViewPage = (): JSX.Element => {
  const { inventoryId } = useParams<{ inventoryId: string }>();
  const { data: inventory, isLoading } = useGetInventoryById(inventoryId ?? '');
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState('items');

  const { canEdit } = useCanEditInventory(inventoryId ?? '', inventory?.ownerId ?? '');

  if (isLoading) return <PageHeader title="Loading..." />;
  if (!inventory) return <PageHeader title="Inventory not found" />;

  const isOwner = inventory.ownerId === user?.id;
  const isAdmin = user?.role === 'ADMIN';
  const canManage = isOwner || isAdmin;

  const publicTabs = [
    {
      id: 'items',
      label: 'Items',
      content: <InventoryItemsTab inventoryId={inventoryId ?? ''} canEdit={canEdit} />,
    },
    {
      id: 'discussion',
      label: 'Discussion',
      content: <InventoryDiscussionTab inventoryId={inventoryId ?? ''} />,
    },
  ];

  const managementTabs = canManage
    ? [
        {
          id: 'settings',
          label: 'Settings',
          content: <InventorySettingsTab inventory={inventory} />,
        },
        {
          id: 'access',
          label: 'Access Management',
          content: <InventoryAccessTab inventoryId={inventoryId ?? ''} />,
        },
        {
          id: 'custom-fields',
          label: 'Custom Fields',
          content: <InventoryCustomFieldsTab inventoryId={inventoryId ?? ''} />,
        },
        {
          id: 'statistics',
          label: 'Statistics',
          content: <InventoryStatisticsTab inventoryId={inventoryId ?? ''} />,
        },
      ]
    : [];

  const allTabs = [...publicTabs, ...managementTabs];

  return (
    <>
      <PageHeader title={inventory.name} />
      <Tabs tabs={allTabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
};
