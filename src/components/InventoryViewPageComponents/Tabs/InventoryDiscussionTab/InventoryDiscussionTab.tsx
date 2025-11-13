import { type JSX } from 'react';
import * as styles from './inventory-discussion-tab.styles';

interface InventoryDiscussionTabProperties {
  inventoryId: string;
}

export const InventoryDiscussionTab = ({
  inventoryId,
}: InventoryDiscussionTabProperties): JSX.Element => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Discussion</h2>
      <p className={styles.description}>Discussion feature for inventory {inventoryId}</p>
    </div>
  );
};
