import {
  type DeleteItemsRequest,
  DeleteItemsRequestSchema,
  type DeleteItemsResponse,
  DeleteItemsResponseSchema,
  type Item,
  type ItemCreateRequest,
  ItemCreateRequestSchema,
  type ItemListQuery,
  ItemListQuerySchema,
  type ItemRequest,
  ItemRequestSchema,
  ItemSchema,
  type ItemUpdateRequest,
  ItemUpdateSchema,
  PaginatedItemsSchema,
} from './items.schemas';
import { type Id, IdSchema, type Paginated } from '../../shared/types/schemas';
import { Validator } from '../../validator/validator';
import { ITEMS_ROUTES } from '../api.requestRoutes';
import { api } from '../api.client';
import { replaceUrlParameters } from '../helpers/api.helpers';

export class ItemsService {
  public static getAll = async (
    inventoryId: Id,
    rawParameters: ItemListQuery = {}
  ): Promise<Paginated<Item>> => {
    const validId = Validator.zodParse(IdSchema, inventoryId);
    const validParameters = Validator.zodParse(ItemListQuerySchema, rawParameters);
    const url = replaceUrlParameters(ITEMS_ROUTES.GET_ALL, { inventoryId: validId });
    const response = await api.get(url, { params: validParameters });
    return Validator.zodParse(PaginatedItemsSchema, response.data);
  };

  public static getOne = async (ids: ItemRequest): Promise<Item> => {
    const { inventoryId, itemId } = Validator.zodParse(ItemRequestSchema, ids);
    const url = replaceUrlParameters(ITEMS_ROUTES.GET_BY_ID, { inventoryId, itemId });
    const response = await api.get(url);
    return Validator.zodParse(ItemSchema, response.data);
  };

  public static create = async (inventoryId: Id, item: ItemCreateRequest): Promise<Item> => {
    const validId = Validator.zodParse(IdSchema, inventoryId);
    const validItem = Validator.zodParse(ItemCreateRequestSchema, item);
    const url = replaceUrlParameters(ITEMS_ROUTES.CREATE, { inventoryId: validId });
    const response = await api.post(url, validItem);
    return Validator.zodParse(ItemSchema, response.data);
  };

  public static update = async (ids: ItemRequest, item: ItemUpdateRequest): Promise<Item> => {
    const { inventoryId, itemId } = Validator.zodParse(ItemRequestSchema, ids);
    const validItem = Validator.zodParse(ItemUpdateSchema, item);
    const url = replaceUrlParameters(ITEMS_ROUTES.UPDATE, { inventoryId, itemId });
    const response = await api.put(url, validItem);
    return Validator.zodParse(ItemSchema, response.data);
  };

  public static removeMany = async (
    inventoryId: Id,
    items: DeleteItemsRequest
  ): Promise<DeleteItemsResponse> => {
    const validId = Validator.zodParse(IdSchema, inventoryId);
    const validItems = Validator.zodParse(DeleteItemsRequestSchema, items);
    if (validItems.items.length === 0) {
      return {
        deleted: 0,
        deletedIds: [],
        conflicts: 0,
        conflictIds: [],
        skipped: 0,
        skippedIds: [],
      };
    }
    const url = replaceUrlParameters(ITEMS_ROUTES.DELETE_MANY, { inventoryId: validId });
    const response = await api.delete<unknown>(url, { data: validItems });
    return Validator.zodParse(DeleteItemsResponseSchema, response.data);
  };

  public static like = async (ids: ItemRequest): Promise<void> => {
    const { inventoryId, itemId } = Validator.zodParse(ItemRequestSchema, ids);
    const url = replaceUrlParameters(ITEMS_ROUTES.LIKE, { inventoryId, itemId });
    return await api.post(url);
  };

  public static unlike = async (ids: ItemRequest): Promise<void> => {
    const { inventoryId, itemId } = Validator.zodParse(ItemRequestSchema, ids);
    const url = replaceUrlParameters(ITEMS_ROUTES.UNLIKE, { inventoryId, itemId });
    return await api.delete(url);
  };
}
