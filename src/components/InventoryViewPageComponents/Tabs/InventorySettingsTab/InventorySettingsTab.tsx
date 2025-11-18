import { type JSX } from 'react';
import type { InventoryDetail } from '../../../../api/InventoryService/inventory.schemas';
import { OdooIntegrationSection } from './OdooIntegrationSection';
import * as styles from './inventory-settings-tab.styles';

interface InventorySettingsTabProperties {
  inventory: InventoryDetail;
}

export const InventorySettingsTab = ({
  inventory,
}: InventorySettingsTabProperties): JSX.Element => {
  return (
    <div className={styles.container}>
      <OdooIntegrationSection inventoryId={inventory.id} />
    </div>
  );
};
