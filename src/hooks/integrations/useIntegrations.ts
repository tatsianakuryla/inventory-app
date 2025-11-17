import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { IntegrationService } from '../../api/IntegrationService/IntegrationService';
import type {
  SalesforceAccountCreateRequest,
  SalesforceAccountWithContactResponse,
  SalesforceContactCreateRequest,
} from '../../api/IntegrationService/salesforce.schemas';

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
