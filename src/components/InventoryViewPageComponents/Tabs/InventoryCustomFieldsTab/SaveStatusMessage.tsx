import type { JSX } from 'react';
import { getTailWindClass } from '../../../../shared/helpers/helpers';
import * as styles from './save-status-message.styles';

interface SaveStatusMessageProperties {
  message: string;
}

export const SaveStatusMessage = ({ message }: SaveStatusMessageProperties): JSX.Element => {
  const isSuccess = message.startsWith('✅');

  return (
    <div
      className={getTailWindClass(
        styles.baseMessage,
        isSuccess ? styles.successMessage : styles.errorMessage
      )}
    >
      {message}
    </div>
  );
};
