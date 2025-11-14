import type { JSX } from 'react';
import * as styles from './info-box.styles';

export const InfoBox = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>💡 Field States:</h4>
      <ul className={styles.list}>
        <li>
          <strong>Hidden:</strong> Field is not visible in forms or tables
        </li>
        <li>
          <strong>Shown:</strong> Field is visible in forms, tables, and can be filled by users
        </li>
      </ul>
    </div>
  );
};
