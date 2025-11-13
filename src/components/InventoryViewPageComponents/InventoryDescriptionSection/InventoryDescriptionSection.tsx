import { type JSX } from 'react';
import type { Inventory } from '../../../api/InventoryService/inventory.schemas';
import { getTailWindClass } from '../../../shared/helpers/helpers';
import * as styles from './inventory-description-section.styles';

interface InventoryDescriptionSectionProperties {
  inventory: Inventory;
}

export const InventoryDescriptionSection = ({
  inventory,
}: InventoryDescriptionSectionProperties): JSX.Element => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        {inventory.imageUrl && (
          <img src={inventory.imageUrl} alt={inventory.name} className={styles.image} />
        )}
        <div className={styles.textContent}>
          <h2 className={styles.title}>{inventory.name}</h2>

          <p className={styles.description}>{inventory.description || 'No description'}</p>

          <div className={styles.metadata}>
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Owner:</span> {inventory.owner.name}
            </span>

            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Created:</span>
              {new Date(inventory.createdAt).toLocaleDateString()}
            </span>

            <span
              className={getTailWindClass(
                styles.badge,
                inventory.isPublic ? styles.badgePublic : styles.badgePrivate
              )}
            >
              {inventory.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
