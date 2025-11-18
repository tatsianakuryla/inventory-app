import { type JSX, useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import * as styles from './odoo-integration-section.styles';

interface TokenDisplayProperties {
  token: string;
}

const COPY_TIMEOUT = 2000;

export const TokenDisplay = ({ token }: TokenDisplayProperties): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const handleCopyToken = useCallback(() => {
    void navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_TIMEOUT);
  }, [token]);

  return (
    <div className={styles.tokenWrapper}>
      <code className={styles.token}>{token}</code>
      <button
        type="button"
        onClick={handleCopyToken}
        className={styles.copyButton}
        title="Copy token to clipboard"
        aria-label={copied ? 'Token copied' : 'Copy token to clipboard'}
      >
        {copied ? (
          <Check className={styles.icon} aria-hidden="true" />
        ) : (
          <Copy className={styles.icon} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
