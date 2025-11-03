import { api } from '../api.client';
import { Validator } from '../../validator/validator';
import {
  type Category,
  type CategoryQuery,
  type CategoryItemsQuantityResponse,
  type CategoryCreate,
  CategoryCreateSchema,
} from './category.schemas';
import {
  CategorySchema,
  PaginatedCategorySchema,
  CategoryItemsQuantityResponseSchema,
} from './category.schemas';
import { CATEGORIES_ROUTES } from '../../shared/constants/constants';
import type { Paginated } from '../../shared/types/schemas';

export class CategoryService {
  public static getAll = async (
    rawParameters: CategoryQuery = {}
  ): Promise<Paginated<Category>> => {
    const parameters = new URLSearchParams();
    if (rawParameters.search) parameters.append('search', rawParameters.search);
    if (rawParameters.page) parameters.append('page', String(rawParameters.page));
    if (rawParameters.perPage) parameters.append('perPage', String(rawParameters.perPage));
    if (rawParameters.sortBy) parameters.append('sortBy', rawParameters.sortBy);
    if (rawParameters.order) parameters.append('order', rawParameters.order);

    const response = await api.get(`${CATEGORIES_ROUTES.GET_ALL}?${parameters.toString()}`);
    return Validator.zodParse(PaginatedCategorySchema, response.data);
  };

  public static getCategoryItemsQuantity = async (): Promise<CategoryItemsQuantityResponse> => {
    const response = await api.get(CATEGORIES_ROUTES.GET_STATS);
    return Validator.zodParse(CategoryItemsQuantityResponseSchema, response.data);
  };

  public static create = async (data: CategoryCreate): Promise<Category> => {
    const validParameters = Validator.zodParse(CategoryCreateSchema, data);
    const response = await api.post(CATEGORIES_ROUTES.CREATE, validParameters);
    return Validator.zodParse(CategorySchema, response.data);
  };
}
