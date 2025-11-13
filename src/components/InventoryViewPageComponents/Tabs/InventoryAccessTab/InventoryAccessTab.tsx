import { type JSX } from 'react';
import * as styles from './inventory-access-tab.styles';

interface InventoryAccessTabProperties {
  inventoryId: string;
}

export const InventoryAccessTab = ({ inventoryId }: InventoryAccessTabProperties): JSX.Element => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Access Management</h2>
      <p className={styles.description}>
        Manage who can view and edit the inventory ${inventoryId}
      </p>
    </div>
  );
};
