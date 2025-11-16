import { type JSX } from 'react';
import type { SalesforceIntegration } from '../../../api/UserService/user.schemas';
import {
  connectedAccountsContainerClassName,
  connectedAccountsTitleClassName,
  connectedAccountsListClassName,
  connectedAccountChipClassName,
  googleIconClassName,
  facebookIconClassName,
  salesforceIconClassName,
} from './profile-info.styles';

type ConnectedAccountsProperties = {
  googleId?: string | null;
  facebookId?: string | null;
  salesforceIntegration?: SalesforceIntegration;
};

export const ConnectedAccounts = ({
  googleId,
  facebookId,
  salesforceIntegration,
}: ConnectedAccountsProperties): JSX.Element | undefined => {
  if (!googleId && !facebookId && !salesforceIntegration) {
    return undefined;
  }

  return (
    <div className={connectedAccountsContainerClassName}>
      <h3 className={connectedAccountsTitleClassName}>Connected Accounts</h3>
      <div className={connectedAccountsListClassName}>
        {googleId && (
          <span className={connectedAccountChipClassName}>
            <svg className={googleIconClassName} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </span>
        )}

        {facebookId && (
          <span className={connectedAccountChipClassName}>
            <svg className={facebookIconClassName} fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </span>
        )}

        {salesforceIntegration && (
          <span className={connectedAccountChipClassName}>
            <svg className={salesforceIconClassName} fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.006 5.415a4.195 4.195 0 013.045-.047 5.905 5.905 0 013.675-3.294 7.682 7.682 0 00-7.619 1.197 6.949 6.949 0 00-.935.869c.552.355 1.04.822 1.434 1.275zm9.632 3.738a4.705 4.705 0 00-.425-1.288 6.537 6.537 0 00-2.228-2.681 4.198 4.198 0 00-5.223 1.051 5.89 5.89 0 00-3.001-.814c-3.268 0-5.92 2.651-5.92 5.92a5.845 5.845 0 00.261 1.725 4.705 4.705 0 00-1.348 3.303c0 2.598 2.106 4.705 4.705 4.705.298 0 .589-.036.872-.095a6.937 6.937 0 006.638 4.92c3.831 0 6.937-3.106 6.937-6.937a6.888 6.888 0 00-2.003-4.867 4.64 4.64 0 00.735-4.942zM8.656 18.357c-1.998 0-3.621-1.622-3.621-3.621s1.622-3.621 3.621-3.621c.447 0 .872.088 1.269.23a6.931 6.931 0 00-.696 3.028c0 1.383.411 2.668 1.111 3.754a3.588 3.588 0 01-1.684.23zm7.703 3.539c-3.198 0-5.798-2.6-5.798-5.798s2.6-5.798 5.798-5.798 5.798 2.6 5.798 5.798-2.6 5.798-5.798 5.798z" />
            </svg>
            Salesforce
          </span>
        )}
      </div>
    </div>
  );
};
