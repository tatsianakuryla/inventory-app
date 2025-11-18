import { api } from '../api.client';
import { ODOO_ROUTES, SALESFORCE_ROUTES } from '../api.requestRoutes';
import {
  type SalesforceAccountCreateRequest,
  type SalesforceAccountWithContactRequest,
  SalesforceAccountWithContactRequestSchema,
  type SalesforceAccountWithContactResponse,
  SalesforceAccountWithContactResponseSchema,
  type SalesforceContactCreateRequest,
} from './salesforce.schemas';
import { type OdooApiTokenResponse, OdooApiTokenResponseSchema } from './odoo.schemas';
import { Validator } from '../../validator/validator';

export class IntegrationService {
  public static async createSalesforceAccountWithContact(
    account: SalesforceAccountCreateRequest,
    contact: Omit<SalesforceContactCreateRequest, 'AccountId'>,
    userId?: string
  ): Promise<SalesforceAccountWithContactResponse> {
    const payload: SalesforceAccountWithContactRequest = Validator.zodParse(
      SalesforceAccountWithContactRequestSchema,
      { account, contact, userId }
    );
    const response = await api.post(SALESFORCE_ROUTES.CREATE_ACCOUNT_WITH_CONTACT, payload);
    return Validator.zodParse(SalesforceAccountWithContactResponseSchema, response.data);
  }

  public static async createOdooApiToken(inventoryId: string): Promise<OdooApiTokenResponse> {
    const url = ODOO_ROUTES.CREATE_API_TOKEN.replace(':inventoryId', inventoryId);
    const response = await api.post(url);
    return Validator.zodParse(OdooApiTokenResponseSchema, response.data);
  }
}
