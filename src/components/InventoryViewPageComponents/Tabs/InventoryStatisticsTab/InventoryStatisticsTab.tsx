import { type JSX } from 'react';
import { useGetInventoryStatistics } from '../../../../hooks/inventories/useInventories';
import { BarChart3, Calendar, Hash, TrendingUp } from 'lucide-react';
import { useGetInventoryById } from '../../../../hooks/inventories/useInventories';
import { isFieldKey } from '../../../../shared/typeguards/typeguards';
import { NAME_KEYS, STATE_KEYS } from '../../../../api/InventoryService/inventory.schemas';
import { getTailWindClass } from '../../../../shared/helpers/helpers';
import * as styles from './inventory-statistics-tab.styles';

interface InventoryStatisticsTabProperties {
  inventoryId: string;
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const InventoryStatisticsTab = ({
  inventoryId,
}: InventoryStatisticsTabProperties): JSX.Element => {
  const { data: statistics, isLoading, error } = useGetInventoryStatistics(inventoryId);
  const { data: inventory } = useGetInventoryById(inventoryId);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <h2 className={styles.title}>Statistics</h2>
        <div className={styles.cardCentered}>
          <p className={styles.loadingMessage}>Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loadingContainer}>
        <h2 className={styles.title}>Statistics</h2>
        <div className={styles.errorCard}>
          <p className={styles.errorMessage}>Failed to load statistics</p>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className={styles.loadingContainer}>
        <h2 className={styles.title}>Statistics</h2>
        <div className={styles.cardCentered}>
          <p className={styles.loadingMessage}>No statistics available</p>
        </div>
      </div>
    );
  }

  const getFieldName = (fieldKey: string): string => {
    if (!inventory?.fields || !isFieldKey(fieldKey)) return fieldKey;
    const nameKey = NAME_KEYS[fieldKey];
    const customName = inventory.fields[nameKey];
    return typeof customName === 'string' && customName ? customName : fieldKey;
  };

  const isFieldShown = (fieldKey: string): boolean => {
    if (!inventory?.fields || !isFieldKey(fieldKey)) return false;
    const stateKey = STATE_KEYS[fieldKey];
    return inventory.fields[stateKey] === 'SHOWN';
  };

  const visibleNumericFields = Object.entries(statistics.numericFields).filter(([fieldKey]) =>
    isFieldShown(fieldKey)
  );

  const visibleTextFields = Object.entries(statistics.textFields).filter(([fieldKey]) =>
    isFieldShown(fieldKey)
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Statistics</h2>

      <div className={styles.statsFlex}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconBlue}>
              <Hash className={getTailWindClass(styles.iconLarge, styles.iconBlueColor)} />
            </div>
            <div>
              <p className={styles.labelSmall}>Total Items</p>
              <p className={styles.valueLarge}>{statistics.itemsCount}</p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconGreen}>
              <Calendar className={getTailWindClass(styles.iconLarge, styles.iconGreenColor)} />
            </div>
            <div>
              <p className={styles.labelSmall}>First Item</p>
              <p className={styles.valueMedium}>{formatDate(statistics.firstItemCreatedAt)}</p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconPurple}>
              <Calendar className={getTailWindClass(styles.iconLarge, styles.iconPurpleColor)} />
            </div>
            <div>
              <p className={styles.labelSmall}>Last Item</p>
              <p className={styles.valueMedium}>{formatDate(statistics.lastItemCreatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {visibleNumericFields.length > 0 && (
        <div className={styles.fieldSection}>
          <h3 className={styles.sectionTitle}>
            <TrendingUp className={styles.iconMedium} />
            Numeric Fields Statistics
          </h3>
          <div className={styles.fieldsFlex}>
            {visibleNumericFields.map(([fieldKey, stats]) => (
              <div key={fieldKey} className={styles.fieldCard}>
                <h4 className={styles.cardTitle}>{getFieldName(fieldKey)}</h4>
                <div className={styles.statValuesFlex}>
                  <div className={styles.statValueBox}>
                    <p className={styles.labelExtraSmall}>Average</p>
                    <p className={styles.valueMedium}>
                      {stats.avg === null ? 'N/A' : stats.avg.toFixed(2)}
                    </p>
                  </div>
                  <div className={styles.statValueBox}>
                    <p className={styles.labelExtraSmall}>Count</p>
                    <p className={styles.valueMedium}>{stats.count}</p>
                  </div>
                  <div className={styles.statValueBox}>
                    <p className={styles.labelExtraSmall}>Minimum</p>
                    <p className={styles.valueMedium}>{stats.min === null ? 'N/A' : stats.min}</p>
                  </div>
                  <div className={styles.statValueBox}>
                    <p className={styles.labelExtraSmall}>Maximum</p>
                    <p className={styles.valueMedium}>{stats.max === null ? 'N/A' : stats.max}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleTextFields.length > 0 && (
        <div className={styles.fieldSection}>
          <h3 className={styles.sectionTitle}>
            <BarChart3 className={styles.iconMedium} />
            Text Fields Statistics
          </h3>
          <div className={styles.fieldsFlex}>
            {visibleTextFields.map(([fieldKey, items]) => (
              <div key={fieldKey} className={styles.fieldCard}>
                <h4 className={styles.cardTitle}>{getFieldName(fieldKey)}</h4>
                <div className={styles.listSpacing}>
                  {items.length > 0 ? (
                    items.slice(0, 5).map((item, index) => (
                      <div key={index} className={styles.textFieldItem}>
                        <span className={styles.textFieldValue}>{item.value}</span>
                        <span className={styles.textFieldBadge}>{item.count}</span>
                      </div>
                    ))
                  ) : (
                    <p className={styles.valueSmall}>No data available</p>
                  )}
                  {items.length > 5 && (
                    <p className={styles.valueExtraSmall}>+{items.length - 5} more values</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {statistics.itemsCount === 0 && (
        <div className={styles.emptyCard}>
          <BarChart3 className={getTailWindClass(styles.iconExtraLarge, styles.iconGrayColor)} />
          <h3 className={styles.emptyTitle}>No Statistics Yet</h3>
          <p className={styles.emptyDescription}>Add items to this inventory to see statistics</p>
        </div>
      )}
    </div>
  );
};
