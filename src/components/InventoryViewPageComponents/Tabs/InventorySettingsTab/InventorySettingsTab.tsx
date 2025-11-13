import { type JSX } from 'react';
import type { InventoryDetail } from '../../../../api/InventoryService/inventory.schemas';
import { Button } from '../../../Button/Button';
import * as styles from './inventory-settings-tab.styles';

interface InventorySettingsTabProperties {
  inventory: InventoryDetail;
}

export const InventorySettingsTab = ({
  inventory,
}: InventorySettingsTabProperties): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Inventory Settings</h2>
        <p className={styles.description}>
          Manage the inventory ${inventory.id} title, description, image, category, and tags
        </p>
      </div>
      <Button variant="primary">Edit Settings</Button>
    </div>
  );
};
