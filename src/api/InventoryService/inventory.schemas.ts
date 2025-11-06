import { z } from 'zod';
import {
  IdSchema,
  VersionSchema,
  EmailSchema,
  OptionalUrlSchema,
  PaginatedSchema,
  PaginationQuerySchema,
  SortOrderSchema,
} from '../../shared/types/schemas';

export const FieldStateEnum = z.enum(['HIDDEN', 'SHOWN']);

export const InventoryFieldsSchema = z.object({
  inventoryId: IdSchema,
  version: z.number().int(),
  text1State: FieldStateEnum,
  text1Name: z.string().nullable(),
  text1Desc: z.string().nullable(),
  text1ShowInTable: z.boolean(),
  text2State: FieldStateEnum,
  text2Name: z.string().nullable(),
  text2Desc: z.string().nullable(),
  text2ShowInTable: z.boolean(),
  text3State: FieldStateEnum,
  text3Name: z.string().nullable(),
  text3Desc: z.string().nullable(),
  text3ShowInTable: z.boolean(),
  long1State: FieldStateEnum,
  long1Name: z.string().nullable(),
  long1Desc: z.string().nullable(),
  long1ShowInTable: z.boolean(),
  long2State: FieldStateEnum,
  long2Name: z.string().nullable(),
  long2Desc: z.string().nullable(),
  long2ShowInTable: z.boolean(),
  long3State: FieldStateEnum,
  long3Name: z.string().nullable(),
  long3Desc: z.string().nullable(),
  long3ShowInTable: z.boolean(),
  num1State: FieldStateEnum,
  num1Name: z.string().nullable(),
  num1Desc: z.string().nullable(),
  num1ShowInTable: z.boolean(),
  num2State: FieldStateEnum,
  num2Name: z.string().nullable(),
  num2Desc: z.string().nullable(),
  num2ShowInTable: z.boolean(),
  num3State: FieldStateEnum,
  num3Name: z.string().nullable(),
  num3Desc: z.string().nullable(),
  num3ShowInTable: z.boolean(),
  link1State: FieldStateEnum,
  link1Name: z.string().nullable(),
  link1Desc: z.string().nullable(),
  link1ShowInTable: z.boolean(),
  link2State: FieldStateEnum,
  link2Name: z.string().nullable(),
  link2Desc: z.string().nullable(),
  link2ShowInTable: z.boolean(),
  link3State: FieldStateEnum,
  link3Name: z.string().nullable(),
  link3Desc: z.string().nullable(),
  link3ShowInTable: z.boolean(),
  bool1State: FieldStateEnum,
  bool1Name: z.string().nullable(),
  bool1Desc: z.string().nullable(),
  bool1ShowInTable: z.boolean(),
  bool2State: FieldStateEnum,
  bool2Name: z.string().nullable(),
  bool2Desc: z.string().nullable(),
  bool2ShowInTable: z.boolean(),
  bool3State: FieldStateEnum,
  bool3Name: z.string().nullable(),
  bool3Desc: z.string().nullable(),
  bool3ShowInTable: z.boolean(),
  displayOrder: z.any().nullable(),
});

export const InventoryIdFormatSchema = z.object({
  inventoryId: IdSchema,
  schema: z.any(),
  updatedAt: z.string(),
  version: z.number().int(),
});

export const InventorySchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  description: z.string().nullable(),
  imageUrl: OptionalUrlSchema,
  isPublic: z.boolean(),
  ownerId: IdSchema,
  owner: z.object({
    name: z.string(),
  }),
  categoryId: z.number().int().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  version: z.number().int(),
});

export const InventoryListItemSchema = InventorySchema;

export const InventoryDetailSchema = InventorySchema.extend({
  fields: InventoryFieldsSchema.nullable(),
  InventoryIdFormat: InventoryIdFormatSchema.nullable(),
});

export const PaginatedInventoryListSchema = PaginatedSchema(InventoryListItemSchema);

export const InventoriesQuerySchema = PaginationQuerySchema.extend({
  search: z.string().trim().default(''),
  sortBy: z.enum(['createdAt', 'name']).default('createdAt'),
  order: SortOrderSchema.default('desc'),
});

export const PopularInventoryItemSchema = InventoryListItemSchema.extend({
  itemsCount: z.number().int().nonnegative(),
});

export const PopularInventoriesQuerySchema = z.object({
  limit: z.number().int().min(1).max(50).optional(),
});

export const PopularInventoriesResponseSchema = z.object({
  items: z.array(PopularInventoryItemSchema),
});

export const RecentInventoriesQuerySchema = z.object({
  limit: z.number().int().min(1).max(50).optional(),
});

export const RecentInventoriesResponseSchema = z.object({
  items: z.array(InventoryListItemSchema),
});

export type FieldState = z.infer<typeof FieldStateEnum>;
export type InventoryFields = z.infer<typeof InventoryFieldsSchema>;
export type InventoryIdFormat = z.infer<typeof InventoryIdFormatSchema>;
export type Inventory = z.infer<typeof InventorySchema>;
export type InventoryListItem = z.infer<typeof InventoryListItemSchema>;
export type InventoryDetail = z.infer<typeof InventoryDetailSchema>;
export type InventoriesQuery = z.input<typeof InventoriesQuerySchema>;
export type PopularInventoriesQuery = z.infer<typeof PopularInventoriesQuerySchema>;
export type PopularInventoriesResponse = z.infer<typeof PopularInventoriesResponseSchema>;
export type RecentInventoriesQuery = z.infer<typeof RecentInventoriesQuerySchema>;
export type RecentInventoriesResponse = z.infer<typeof RecentInventoriesResponseSchema>;

export const InventoryCreateRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().optional(),
  isPublic: z.boolean().default(false),
  imageUrl: OptionalUrlSchema,
  categoryId: z.number().int().optional(),
});

export type InventoryCreateRequestInput = z.input<typeof InventoryCreateRequestSchema>;

export const InventoryUpdateRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').optional(),
  description: z.string().trim().optional(),
  isPublic: z.boolean().optional(),
  imageUrl: OptionalUrlSchema,
  categoryId: z.number().int().nullable().optional(),
  version: VersionSchema,
});

export type InventoryUpdateRequest = z.infer<typeof InventoryUpdateRequestSchema>;

export const InventoryToDeleteSchema = z.object({
  id: IdSchema,
  version: VersionSchema,
});

export type InventoryToDelete = z.infer<typeof InventoryToDeleteSchema>;

export const DeleteInventoriesBodySchema = z.object({
  inventories: z.array(InventoryToDeleteSchema).min(1).max(200, 'Too many inventories to delete'),
});

export type DeleteInventoriesBody = z.infer<typeof DeleteInventoriesBodySchema>;

export const DeleteInventoriesResponseSchema = z.object({
  deleted: z.number().int().nonnegative(),
  deletedIds: z.array(IdSchema),
  conflicts: z.number().int().nonnegative(),
  conflictIds: z.array(IdSchema),
  skipped: z.number().int().nonnegative(),
  skippedIds: z.array(IdSchema),
});

export type DeleteInventoriesResponse = z.infer<typeof DeleteInventoriesResponseSchema>;

export const BulkUpdateVisibilityBodySchema = z.object({
  inventoryIds: z.array(IdSchema).min(1).max(200, 'Too many inventories'),
  isPublic: z.boolean(),
});

export type BulkUpdateVisibilityBody = z.infer<typeof BulkUpdateVisibilityBodySchema>;

export const BulkUpdateVisibilityResponseSchema = z.object({
  updated: z.number().int().nonnegative(),
  updatedIds: z.array(IdSchema),
  skipped: z.number().int().nonnegative(),
  skippedIds: z.array(IdSchema),
});

export type BulkUpdateVisibilityResponse = z.infer<typeof BulkUpdateVisibilityResponseSchema>;

export const InventoryRoleEnum = z.enum(['OWNER', 'EDITOR', 'VIEWER']);

export type InventoryRole = z.infer<typeof InventoryRoleEnum>;

export const InventoryAccessUserSchema = z.object({
  id: IdSchema,
  name: z.string(),
  email: EmailSchema,
});

export const InventoryAccessDataItemSchema = z.object({
  userId: IdSchema,
  inventoryRole: InventoryRoleEnum,
  user: InventoryAccessUserSchema,
});

export type InventoryAccessDataItem = z.infer<typeof InventoryAccessDataItemSchema>;

export const InventoryAccessDataSchema = z.array(InventoryAccessDataItemSchema);

export type InventoryAccessData = z.infer<typeof InventoryAccessDataSchema>;

export const InventoryAccessEntrySchema = z.object({
  userId: IdSchema,
  inventoryRole: z
    .string()
    .trim()
    .toUpperCase()
    .pipe(z.enum(['OWNER', 'VIEWER', 'EDITOR'] as const)),
});

export type InventoryAccessEntry = z.infer<typeof InventoryAccessEntrySchema>;

export const UpsertAccessBodySchema = z.object({
  accesses: z.array(InventoryAccessEntrySchema).min(1).max(200, 'Too many users to update access'),
});

export type UpsertAccessBody = z.infer<typeof UpsertAccessBodySchema>;

export const UpsertAccessResponseSchema = z.object({
  processed: z.number().int().nonnegative(),
  created: z.number().int().nonnegative(),
  createdUserIds: z.array(IdSchema),
  updated: z.number().int().nonnegative(),
  updatedUserIds: z.array(IdSchema),
  unchanged: z.number().int().nonnegative(),
  unchangedUserIds: z.array(IdSchema),
  skipped: z.number().int().nonnegative(),
  skippedInvalidOwnerUserIds: z.array(IdSchema),
});

export type UpsertAccessResponse = z.infer<typeof UpsertAccessResponseSchema>;

export const RevokeAccessBodySchema = z.object({
  userIds: z.array(IdSchema).min(1),
});

export type RevokeAccessBody = z.infer<typeof RevokeAccessBodySchema>;

export const RevokeAccessResponseSchema = z.object({
  deleted: z.number().int().nonnegative(),
  deletedUserIds: z.array(IdSchema),
  skipped: z.number().int().nonnegative(),
  skippedOwnerUserIds: z.array(IdSchema),
  notFound: z.number().int().nonnegative(),
  notFoundUserIds: z.array(IdSchema),
});

export type RevokeAccessResponse = z.infer<typeof RevokeAccessResponseSchema>;

export const UpdateInventoryFieldsBodySchema = z.object({
  version: VersionSchema,
  patch: z
    .record(z.string(), z.unknown())
    .refine((object) => Object.keys(object).length > 0, { message: 'Empty patch' }),
});

export type UpdateInventoryFieldsBody = z.infer<typeof UpdateInventoryFieldsBodySchema>;

export const UpdateInventoryFieldsResponseSchema = z.object({
  inventoryId: IdSchema,
  version: z.number().int(),
});

export type UpdateInventoryFieldsResponse = z.infer<typeof UpdateInventoryFieldsResponseSchema>;

export const UpdateIdFormatBodySchema = z.object({
  schema: z.any(),
  version: VersionSchema.optional(),
});

export type UpdateIdFormatBody = z.infer<typeof UpdateIdFormatBodySchema>;

export const NumericStatisticsSchema = z.object({
  avg: z.number().nullable(),
  min: z.number().nullable(),
  max: z.number().nullable(),
  count: z.number().int().nonnegative(),
});

export const TextStatisticsItemSchema = z.object({
  value: z.string(),
  count: z.number().int().positive(),
});

export const InventoryStatisticsSchema = z.object({
  itemsCount: z.number().int().nonnegative(),
  numericFields: z.record(z.string(), NumericStatisticsSchema),
  textFields: z.record(z.string(), z.array(TextStatisticsItemSchema)),
  firstItemCreatedAt: z.string().nullable(),
  lastItemCreatedAt: z.string().nullable(),
});

export type InventoryStatistics = z.infer<typeof InventoryStatisticsSchema>;

export const PreviewCustomIdResponseSchema = z.object({
  preview: z.string(),
});

export type PreviewCustomIdResponse = z.infer<typeof PreviewCustomIdResponseSchema>;
