import { api } from '../api.client';
import { SALESFORCE_ROUTES } from '../api.requestRoutes';
import {
  type SalesforceAccountCreateRequest,
  type SalesforceAccountWithContactRequest,
  SalesforceAccountWithContactRequestSchema,
  type SalesforceAccountWithContactResponse,
  SalesforceAccountWithContactResponseSchema,
  type SalesforceContactCreateRequest,
} from './salesforce.schemas';
import { Validator } from '../../validator/validator';

export class IntegrationService {
  public static async createSalesforceAccountWithContact(
    account: SalesforceAccountCreateRequest,
    contact: Omit<SalesforceContactCreateRequest, 'AccountId'>
  ): Promise<SalesforceAccountWithContactResponse> {
    const payload: SalesforceAccountWithContactRequest = Validator.zodParse(
      SalesforceAccountWithContactRequestSchema,
      { account, contact }
    );
    const response = await api.post(SALESFORCE_ROUTES.CREATE_ACCOUNT_WITH_CONTACT, payload);
    return Validator.zodParse(SalesforceAccountWithContactResponseSchema, response.data);
  }
}
