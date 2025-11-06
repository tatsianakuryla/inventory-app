import { z } from 'zod';
import {
  IdSchema,
  OptionalUrlSchema,
  PaginatedSchema,
  PaginationQuerySchema,
  SortOrderSchema,
  VersionSchema,
} from '../../shared/types/schemas';

export const ItemListQuerySchema = PaginationQuerySchema.extend({
  search: z.string().trim().default(''),
  sortBy: z.enum(['createdAt', 'updatedAt', 'customId']).default('createdAt'),
  order: SortOrderSchema.default('desc'),
});

export type ItemListQuery = z.input<typeof ItemListQuerySchema>;

export const baseFields = z.object({
  text1: z.string().trim().nullable().optional(),
  text2: z.string().trim().nullable().optional(),
  text3: z.string().trim().nullable().optional(),
  long1: z.string().trim().nullable().optional(),
  long2: z.string().trim().nullable().optional(),
  long3: z.string().trim().nullable().optional(),
  num1: z.number().nullable().optional(),
  num2: z.number().nullable().optional(),
  num3: z.number().nullable().optional(),
  link1: OptionalUrlSchema,
  link2: OptionalUrlSchema,
  link3: OptionalUrlSchema,
  bool1: z.boolean().nullable().optional(),
  bool2: z.boolean().nullable().optional(),
  bool3: z.boolean().nullable().optional(),
});

export const ItemSchema = baseFields.extend({
  id: IdSchema,
  inventoryId: IdSchema,
  customId: z.string().trim().min(1, 'Custom ID is required').max(96),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  version: VersionSchema,
  createdById: IdSchema,
  _count: z.object({ likes: z.number() }).optional(),
});

export const ItemCreateRequestSchema = baseFields;

export type ItemCreateRequest = z.infer<typeof ItemCreateRequestSchema>;
export type Item = z.infer<typeof ItemSchema>;

export const ItemRequestSchema = z.object({
  inventoryId: IdSchema,
  itemId: IdSchema,
});

export type ItemRequest = z.infer<typeof ItemRequestSchema>;

export const PaginatedItemsSchema = PaginatedSchema(ItemSchema);

export const ItemUpdateSchema = baseFields.extend({
  version: VersionSchema,
  customId: z.string().trim().min(1, 'Custom ID is required').max(96).optional(),
});

export type ItemUpdateRequest = z.infer<typeof ItemUpdateSchema>;

export const DeleteItemsRequestSchema = z.object({
  items: z
    .array(z.object({ id: IdSchema, version: VersionSchema }))
    .min(1)
    .max(200),
});

export type DeleteItemsRequest = z.infer<typeof DeleteItemsRequestSchema>;

export const DeleteItemsResponseSchema = z.object({
  deleted: z.number(),
  deletedIds: z.array(z.number()),
  conflicts: z.number(),
  conflictIds: z.array(z.number()),
  skipped: z.number(),
  skippedIds: z.array(z.number()),
});

export type DeleteItemsResponse = z.infer<typeof DeleteItemsResponseSchema>;
