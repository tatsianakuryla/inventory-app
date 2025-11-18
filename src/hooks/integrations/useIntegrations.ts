import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { IntegrationService } from '../../api/IntegrationService/IntegrationService';
import type {
  SalesforceAccountCreateRequest,
  SalesforceAccountWithContactResponse,
  SalesforceContactCreateRequest,
} from '../../api/IntegrationService/salesforce.schemas';
import type { OdooApiTokenResponse } from '../../api/IntegrationService/odoo.schemas';

type SalesforceIntegrationVariables = {
  account: SalesforceAccountCreateRequest;
  contact: Omit<SalesforceContactCreateRequest, 'AccountId'>;
  userId?: string;
};

export const useSalesforceIntegration = (): UseMutationResult<
  SalesforceAccountWithContactResponse,
  unknown,
  SalesforceIntegrationVariables
> => {
  return useMutation<SalesforceAccountWithContactResponse, unknown, SalesforceIntegrationVariables>(
    {
      mutationFn: ({ account, contact, userId }) =>
        IntegrationService.createSalesforceAccountWithContact(account, contact, userId),
    }
  );
};

export const useOdooIntegration = (
  options?: Omit<UseMutationOptions<OdooApiTokenResponse, unknown, string>, 'mutationFn'>
): UseMutationResult<OdooApiTokenResponse, unknown, string> => {
  return useMutation<OdooApiTokenResponse, unknown, string>({
    mutationFn: (inventoryId) => IntegrationService.createOdooApiToken(inventoryId),
    ...options,
  });
};
