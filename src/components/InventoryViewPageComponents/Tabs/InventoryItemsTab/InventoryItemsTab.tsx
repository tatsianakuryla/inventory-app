import { type JSX } from 'react';
import { AddNewItemButton } from '../../AddNewItemButton/AddNewItemButton';
import { InventoryViewPageTable } from '../../Tables/InventoryViewPageTable';
import { container } from './inventory-items-tab.styles';

interface InventoryItemsTabProperties {
  inventoryId: string;
  canEdit: boolean;
}

export const InventoryItemsTab = ({
  inventoryId,
  canEdit,
}: InventoryItemsTabProperties): JSX.Element => {
  return (
    <div className={container}>
      <AddNewItemButton canEdit={canEdit} inventoryId={inventoryId} />
      <InventoryViewPageTable canEdit={canEdit} />
    </div>
  );
};
