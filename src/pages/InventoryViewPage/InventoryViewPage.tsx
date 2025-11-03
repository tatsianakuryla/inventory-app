import { type JSX } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { useGetInventoryById } from '../../hooks/inventories/useInventories';
import { useUserStore } from '../../stores/useUserStore';
import { AddNewItemButton } from '../../components/InventoryViewPageComponents/AddNewItemButton/AddNewItemButton';
import { InventoryDescriptionSection } from '../../components/InventoryViewPageComponents/InventoryDescriptionSection/InventoryDescriptionSection';
import { InventoryViewPageTable } from '../../components/InventoryViewPageComponents/Tables/InventoryViewPageTable/InventoryViewPageTable';

export const InventoryViewPage = (): JSX.Element => {
  const { inventoryId } = useParams<{ inventoryId: string }>();
  const { data: inventory, isLoading } = useGetInventoryById(inventoryId ?? '');
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  if (isLoading) return <PageHeader title="Loading..." />;
  if (!inventory) return <PageHeader title="Inventory not found" />;

  return (
    <>
      <PageHeader />
      <AddNewItemButton isAuthenticated={isAuthenticated} inventoryId={inventoryId} />
      <InventoryDescriptionSection inventory={inventory} />
      <InventoryViewPageTable />
    </>
  );
};
