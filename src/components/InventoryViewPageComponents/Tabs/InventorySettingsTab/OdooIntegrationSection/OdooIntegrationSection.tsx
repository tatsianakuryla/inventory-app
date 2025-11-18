import { type JSX, useState, useCallback } from 'react';
import { Button } from '../../../../Button/Button';
import { useOdooIntegration } from '../../../../../hooks/integrations/useIntegrations';
import { TokenDisplay } from './TokenDisplay';
import { ODOO_INTEGRATION_TEXTS } from './constants';
import * as styles from './odoo-integration-section.styles';

interface OdooIntegrationSectionProperties {
  inventoryId: string;
}

export const OdooIntegrationSection = ({
  inventoryId,
}: OdooIntegrationSectionProperties): JSX.Element => {
  const [token, setToken] = useState<string | undefined>();

  const handleSuccess = useCallback((data: { token: string }) => {
    setToken(data.token);
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error('Failed to generate token:', error);
  }, []);

  const { mutate: generateToken, isPending } = useOdooIntegration({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleGenerateToken = useCallback(() => {
    generateToken(inventoryId);
  }, [generateToken, inventoryId]);

  return (
    <section className={styles.container} aria-label="Odoo integration">
      <div className={styles.header}>
        <h3 className={styles.title}>{ODOO_INTEGRATION_TEXTS.TITLE}</h3>
        <p className={styles.description}>{ODOO_INTEGRATION_TEXTS.DESCRIPTION}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.emptyState}>
          {token ? (
            <TokenDisplay token={token} />
          ) : (
            <Button variant="primary" onClick={handleGenerateToken} disabled={isPending}>
              {isPending
                ? ODOO_INTEGRATION_TEXTS.GENERATING
                : ODOO_INTEGRATION_TEXTS.GENERATE_BUTTON}
            </Button>
          )}
        </div>
      </div>

      <div className={styles.infoBox}>
        <h4 className={styles.infoTitle}>{ODOO_INTEGRATION_TEXTS.INFO_TITLE}</h4>
        <ol className={styles.infoList}>
          {ODOO_INTEGRATION_TEXTS.STEPS.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
};
