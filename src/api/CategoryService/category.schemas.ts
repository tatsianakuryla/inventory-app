import { z } from 'zod';
import {
  PaginatedSchema,
  SortOrderSchema,
  SearchQuerySchema,
  PaginationQuerySchema,
} from '../../shared/types/schemas';

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export const CategoryWithCountSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  inventoriesCount: z.number().int().nonnegative(),
});

export type CategoryWithCount = z.infer<typeof CategoryWithCountSchema>;

export const CategoryItemsQuantityResponseSchema = z.object({
  items: z.array(CategoryWithCountSchema),
});

export type CategoryItemsQuantityResponse = z.infer<typeof CategoryItemsQuantityResponseSchema>;

export const PaginatedCategorySchema = PaginatedSchema(CategorySchema);

export const CategoryQuerySchema = PaginationQuerySchema.extend({
  search: SearchQuerySchema.shape.search.optional(),
  sortBy: z.enum(['name', 'id']).optional(),
  order: SortOrderSchema.optional(),
});

export type CategoryQuery = z.input<typeof CategoryQuerySchema>;
