import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { CategoryService } from '../../api/CategoryService/CategoryService';
import { queryKeys } from '../../queryClient/queryClient';
import type {
  Category,
  CategoryQuery,
  CategoryItemsQuantityResponse,
  CategoryCreate,
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

export const useCreateCategory = (): UseMutationResult<Category, Error, CategoryCreate> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CategoryService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.categoriesStats });
    },
  });
};
