import { type JSX } from 'react';
import { AddNewItemButton } from '../../AddNewItemButton/AddNewItemButton';
import { InventoryViewPageTable } from '../../Tables/InventoryViewPageTable/InventoryViewPageTable';

interface InventoryItemsTabProperties {
  inventoryId: string;
  canEdit: boolean;
}

export const InventoryItemsTab = ({
  inventoryId,
  canEdit,
}: InventoryItemsTabProperties): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <AddNewItemButton canEdit={canEdit} inventoryId={inventoryId} />
      <InventoryViewPageTable />
    </div>
  );
};
