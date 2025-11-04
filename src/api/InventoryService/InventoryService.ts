import { api } from '../api.client';
import {
  type InventoryListItem,
  type InventoriesQuery,
  type PopularInventoriesQuery,
  type PopularInventoriesResponse,
  type RecentInventoriesQuery,
  type RecentInventoriesResponse,
  type InventoryDetail,
  type InventoryUpdateRequest,
  type DeleteInventoriesBody,
  type DeleteInventoriesResponse,
  type InventoryAccessData,
  type UpsertAccessBody,
  type UpsertAccessResponse,
  type RevokeAccessBody,
  type RevokeAccessResponse,
  type UpdateInventoryFieldsBody,
  type UpdateInventoryFieldsResponse,
  type UpdateIdFormatBody,
  type InventoryIdFormat,
  type InventoryStatistics,
  InventoriesQuerySchema,
  PaginatedInventoryListSchema,
  PopularInventoriesQuerySchema,
  PopularInventoriesResponseSchema,
  RecentInventoriesQuerySchema,
  RecentInventoriesResponseSchema,
  InventoryDetailSchema,
  InventoryCreateRequestSchema,
  InventoryUpdateRequestSchema,
  DeleteInventoriesBodySchema,
  DeleteInventoriesResponseSchema,
  InventoryAccessDataSchema,
  UpsertAccessBodySchema,
  UpsertAccessResponseSchema,
  RevokeAccessBodySchema,
  RevokeAccessResponseSchema,
  UpdateInventoryFieldsBodySchema,
  UpdateInventoryFieldsResponseSchema,
  UpdateIdFormatBodySchema,
  InventoryIdFormatSchema,
  InventoryStatisticsSchema,
  type InventoryCreateRequestInput,
  InventoryListItemSchema,
} from './inventory.schemas';
import { Validator } from '../../validator/validator';
import { HOME_ROUTES, INVENTORY_ROUTES } from '../api.requestRoutes';
import type { Paginated } from '../../shared/types/schemas';

function replaceUrlParameters(url: string, parameters: Record<string, string>): string {
  let result = url;
  for (const [key, value] of Object.entries(parameters)) {
    result = result.replace(`:${key}`, value);
  }
  return result;
}

export class InventoriesService {
  public static create = async (
    rawBody: InventoryCreateRequestInput
  ): Promise<InventoryListItem> => {
    const validBody = Validator.zodParse(InventoryCreateRequestSchema, rawBody);
    const response = await api.post(INVENTORY_ROUTES.CREATE, validBody);
    return Validator.zodParse(InventoryListItemSchema, response.data);
  };

  public static getAll = async (
    rawParameters: InventoriesQuery = {}
  ): Promise<Paginated<InventoryListItem>> => {
    const validParameters = Validator.zodParse(InventoriesQuerySchema, rawParameters);
    const response = await api.get(INVENTORY_ROUTES.GET_ALL, { params: validParameters });
    return Validator.zodParse(PaginatedInventoryListSchema, response.data);
  };

  public static getMyWriteAccessInventories = async (
    rawParameters: InventoriesQuery = {}
  ): Promise<Paginated<InventoryListItem>> => {
    const validParameters = Validator.zodParse(InventoriesQuerySchema, rawParameters);
    const response = await api.get(INVENTORY_ROUTES.GET_MY_WRITE_ACCESS, {
      params: validParameters,
    });
    return Validator.zodParse(PaginatedInventoryListSchema, response.data);
  };

  public static getPopular = async (
    rawParameters: PopularInventoriesQuery = {}
  ): Promise<PopularInventoriesResponse> => {
    const validParameters = Validator.zodParse(PopularInventoriesQuerySchema, rawParameters);
    const response = await api.get(HOME_ROUTES.GET_POPULAR, { params: validParameters });
    return Validator.zodParse(PopularInventoriesResponseSchema, response.data);
  };

  public static getRecent = async (
    rawParameters: RecentInventoriesQuery = {}
  ): Promise<RecentInventoriesResponse> => {
    const validParameters = Validator.zodParse(RecentInventoriesQuerySchema, rawParameters);
    const response = await api.get(HOME_ROUTES.GET_RECENT, { params: validParameters });
    return Validator.zodParse(RecentInventoriesResponseSchema, response.data);
  };

  public static getById = async (inventoryId: string): Promise<InventoryDetail> => {
    const url = replaceUrlParameters(INVENTORY_ROUTES.GET_BY_ID, { inventoryId });
    const response = await api.get(url);
    return Validator.zodParse(InventoryDetailSchema, response.data);
  };

  public static update = async (
    inventoryId: string,
    rawBody: InventoryUpdateRequest
  ): Promise<InventoryListItem> => {
    const validBody = Validator.zodParse(InventoryUpdateRequestSchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.UPDATE, { inventoryId });
    const response = await api.patch(url, validBody);
    return Validator.zodParse(InventoryDetailSchema, response.data);
  };

  public static deleteMany = async (
    rawBody: DeleteInventoriesBody
  ): Promise<DeleteInventoriesResponse> => {
    const validBody = Validator.zodParse(DeleteInventoriesBodySchema, rawBody);
    const response = await api.delete(INVENTORY_ROUTES.DELETE_MANY, { data: validBody });
    return Validator.zodParse(DeleteInventoriesResponseSchema, response.data);
  };

  public static getAccessData = async (inventoryId: string): Promise<InventoryAccessData> => {
    const url = replaceUrlParameters(INVENTORY_ROUTES.GET_ACCESS, { inventoryId });
    const response = await api.get(url);
    return Validator.zodParse(InventoryAccessDataSchema, response.data);
  };

  public static updateAccess = async (
    inventoryId: string,
    rawBody: UpsertAccessBody
  ): Promise<UpsertAccessResponse> => {
    const validBody = Validator.zodParse(UpsertAccessBodySchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.UPDATE_ACCESS, { inventoryId });
    const response = await api.put(url, validBody);
    return Validator.zodParse(UpsertAccessResponseSchema, response.data);
  };

  public static revokeAccess = async (
    inventoryId: string,
    rawBody: RevokeAccessBody
  ): Promise<RevokeAccessResponse> => {
    const validBody = Validator.zodParse(RevokeAccessBodySchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.REVOKE_ACCESS, { inventoryId });
    const response = await api.delete(url, { data: validBody });
    return Validator.zodParse(RevokeAccessResponseSchema, response.data);
  };

  public static updateFields = async (
    inventoryId: string,
    rawBody: UpdateInventoryFieldsBody
  ): Promise<UpdateInventoryFieldsResponse> => {
    const validBody = Validator.zodParse(UpdateInventoryFieldsBodySchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.UPDATE_FIELDS, { inventoryId });
    const response = await api.patch(url, validBody);
    return Validator.zodParse(UpdateInventoryFieldsResponseSchema, response.data);
  };

  public static updateIdFormat = async (
    inventoryId: string,
    rawBody: UpdateIdFormatBody
  ): Promise<InventoryIdFormat> => {
    const validBody = Validator.zodParse(UpdateIdFormatBodySchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.UPDATE_ID_FORMAT, { inventoryId });
    const response = await api.patch(url, validBody);
    return Validator.zodParse(InventoryIdFormatSchema, response.data);
  };

  public static getStatistics = async (inventoryId: string): Promise<InventoryStatistics> => {
    const url = replaceUrlParameters(INVENTORY_ROUTES.GET_STATISTICS, { inventoryId });
    const response = await api.get(url);
    return Validator.zodParse(InventoryStatisticsSchema, response.data);
  };
}
