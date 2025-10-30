import { api } from '../api.client';
import {
  type Paginated,
  type InventoryListItem,
  type InventoriesQuery,
  type PopularInventoriesQuery,
  type PopularInventoriesResponse,
  type RecentInventoriesQuery,
  type RecentInventoriesResponse,
  type InventoryDetail,
  type InventoryCreateRequest,
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
} from './inventory.schemas';
import { Validator } from '../../validator/validator';
import { INVENTORY_ROUTES } from '../../shared/constants/constants';

function replaceUrlParameters(url: string, parameters: Record<string, string>): string {
  let result = url;
  for (const [key, value] of Object.entries(parameters)) {
    result = result.replace(`:${key}`, value);
  }
  return result;
}

export class InventoriesService {
  public static create = async (rawBody: InventoryCreateRequest): Promise<InventoryListItem> => {
    const validBody = Validator.zodParse(InventoryCreateRequestSchema, rawBody);
    const response = await api.post(INVENTORY_ROUTES.CREATE, validBody);
    const data: unknown = response.data;
    return Validator.zodParse(InventoryDetailSchema, data);
  };

  public static getAll = async (
    rawParameters: InventoriesQuery = {}
  ): Promise<Paginated<InventoryListItem>> => {
    const validParameters = Validator.zodParse(InventoriesQuerySchema, rawParameters);
    const response = await api.get(INVENTORY_ROUTES.GET_ALL, { params: validParameters });
    const data: unknown = response.data;
    return Validator.zodParse(PaginatedInventoryListSchema, data);
  };

  public static getPopular = async (
    rawParameters: PopularInventoriesQuery = {}
  ): Promise<PopularInventoriesResponse> => {
    const validParameters = Validator.zodParse(PopularInventoriesQuerySchema, rawParameters);
    const response = await api.get(INVENTORY_ROUTES.GET_POPULAR, { params: validParameters });
    const data: unknown = response.data;
    return Validator.zodParse(PopularInventoriesResponseSchema, data);
  };

  public static getRecent = async (
    rawParameters: RecentInventoriesQuery = {}
  ): Promise<RecentInventoriesResponse> => {
    const validParameters = Validator.zodParse(RecentInventoriesQuerySchema, rawParameters);
    const response = await api.get(INVENTORY_ROUTES.GET_RECENT, { params: validParameters });
    const data: unknown = response.data;
    return Validator.zodParse(RecentInventoriesResponseSchema, data);
  };

  public static getById = async (inventoryId: string): Promise<InventoryDetail> => {
    const url = replaceUrlParameters(INVENTORY_ROUTES.GET_BY_ID, { inventoryId });
    const response = await api.get(url);
    const data: unknown = response.data;
    return Validator.zodParse(InventoryDetailSchema, data);
  };

  public static update = async (
    inventoryId: string,
    rawBody: InventoryUpdateRequest
  ): Promise<InventoryListItem> => {
    const validBody = Validator.zodParse(InventoryUpdateRequestSchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.UPDATE, { inventoryId });
    const response = await api.patch(url, validBody);
    const data: unknown = response.data;
    return Validator.zodParse(InventoryDetailSchema, data);
  };

  public static deleteMany = async (
    rawBody: DeleteInventoriesBody
  ): Promise<DeleteInventoriesResponse> => {
    const validBody = Validator.zodParse(DeleteInventoriesBodySchema, rawBody);
    const response = await api.delete(INVENTORY_ROUTES.DELETE_MANY, { data: validBody });
    const data: unknown = response.data;
    return Validator.zodParse(DeleteInventoriesResponseSchema, data);
  };

  public static getAccessData = async (inventoryId: string): Promise<InventoryAccessData> => {
    const url = replaceUrlParameters(INVENTORY_ROUTES.GET_ACCESS, { inventoryId });
    const response = await api.get(url);
    const data: unknown = response.data;
    return Validator.zodParse(InventoryAccessDataSchema, data);
  };

  public static updateAccess = async (
    inventoryId: string,
    rawBody: UpsertAccessBody
  ): Promise<UpsertAccessResponse> => {
    const validBody = Validator.zodParse(UpsertAccessBodySchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.UPDATE_ACCESS, { inventoryId });
    const response = await api.put(url, validBody);
    const data: unknown = response.data;
    return Validator.zodParse(UpsertAccessResponseSchema, data);
  };

  public static revokeAccess = async (
    inventoryId: string,
    rawBody: RevokeAccessBody
  ): Promise<RevokeAccessResponse> => {
    const validBody = Validator.zodParse(RevokeAccessBodySchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.REVOKE_ACCESS, { inventoryId });
    const response = await api.delete(url, { data: validBody });
    const data: unknown = response.data;
    return Validator.zodParse(RevokeAccessResponseSchema, data);
  };

  public static updateFields = async (
    inventoryId: string,
    rawBody: UpdateInventoryFieldsBody
  ): Promise<UpdateInventoryFieldsResponse> => {
    const validBody = Validator.zodParse(UpdateInventoryFieldsBodySchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.UPDATE_FIELDS, { inventoryId });
    const response = await api.patch(url, validBody);
    const data: unknown = response.data;
    return Validator.zodParse(UpdateInventoryFieldsResponseSchema, data);
  };

  public static updateIdFormat = async (
    inventoryId: string,
    rawBody: UpdateIdFormatBody
  ): Promise<InventoryIdFormat> => {
    const validBody = Validator.zodParse(UpdateIdFormatBodySchema, rawBody);
    const url = replaceUrlParameters(INVENTORY_ROUTES.UPDATE_ID_FORMAT, { inventoryId });
    const response = await api.patch(url, validBody);
    const data: unknown = response.data;
    return Validator.zodParse(InventoryIdFormatSchema, data);
  };

  public static getStatistics = async (inventoryId: string): Promise<InventoryStatistics> => {
    const url = replaceUrlParameters(INVENTORY_ROUTES.GET_STATISTICS, { inventoryId });
    const response = await api.get(url);
    const data: unknown = response.data;
    return Validator.zodParse(InventoryStatisticsSchema, data);
  };
}
