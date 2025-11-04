import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { CategoryService } from '../../api/CategoryService/CategoryService';
import { queryKeys } from '../../queryClient/queryClient';
import type {
  Category,
  CategoryQuery,
  CategoryItemsQuantityResponse,
} from '../../api/CategoryService/category.schemas';
import type { Paginated } from '../../shared/types/schemas';

export const useGetCategories = (
  parameters?: CategoryQuery,
  options?: { enabled?: boolean }
): UseQueryResult<Paginated<Category>, Error> => {
  return useQuery({
    queryKey: [...queryKeys.categories, parameters],
    queryFn: () => CategoryService.getAll(parameters),
    enabled: options?.enabled,
  });
};

export const useGetCategoryItemsQuantity = (options?: {
  enabled?: boolean;
}): UseQueryResult<CategoryItemsQuantityResponse, Error> => {
  return useQuery({
    queryKey: queryKeys.categoriesStats,
    queryFn: () => CategoryService.getCategoryItemsQuantity(),
    enabled: options?.enabled,
  });
};
