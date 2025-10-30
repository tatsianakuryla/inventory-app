import { z } from 'zod';

export const FieldStateEnum = z.enum(['HIDDEN', 'SHOWN']);

export const InventoryFieldsSchema = z.object({
  inventoryId: z.string().uuid(),
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
  inventoryId: z.string().uuid(),
  schema: z.any(),
  updatedAt: z.string(),
  version: z.number().int(),
});

export const InventoryListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable(),
  imageUrl: z.string().url().nullable(),
  isPublic: z.boolean(),
  ownerId: z.string().uuid(),
  categoryId: z.number().int().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  version: z.number().int(),
});

export const InventoryDetailSchema = InventoryListItemSchema.extend({
  fields: InventoryFieldsSchema.nullable(),
  InventoryIdFormat: InventoryIdFormatSchema.nullable(),
});

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
};

export const PaginatedSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
): z.ZodType<Paginated<z.infer<T>>> =>
  z.object({
    items: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    perPage: z.number().int().positive(),
    hasMore: z.boolean(),
  });

export const PaginatedInventoryListSchema = PaginatedSchema(InventoryListItemSchema);

export const InventoriesQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional(),
  search: z.string().trim().optional(),
  sortBy: z.enum(['createdAt', 'name']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
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
export type InventoryListItem = z.infer<typeof InventoryListItemSchema>;
export type InventoryDetail = z.infer<typeof InventoryDetailSchema>;
export type InventoriesQuery = z.infer<typeof InventoriesQuerySchema>;
export type PopularInventoryItem = z.infer<typeof PopularInventoryItemSchema>;
export type PopularInventoriesQuery = z.infer<typeof PopularInventoriesQuerySchema>;
export type PopularInventoriesResponse = z.infer<typeof PopularInventoriesResponseSchema>;
export type RecentInventoriesQuery = z.infer<typeof RecentInventoriesQuerySchema>;
export type RecentInventoriesResponse = z.infer<typeof RecentInventoriesResponseSchema>;

export const InventoryCreateRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().optional(),
  isPublic: z.boolean().default(false),
  imageUrl: z.string().url().optional(),
  categoryId: z.number().int().optional(),
});

export type InventoryCreateRequest = z.infer<typeof InventoryCreateRequestSchema>;

export const InventoryUpdateRequestSchema = z.object({
  version: z.number().int().min(1),
  name: z.string().trim().min(1).optional(),
  description: z.string().nullable().optional(),
  isPublic: z.boolean().optional(),
  imageUrl: z.string().url().nullable().optional(),
  categoryId: z.number().int().nullable().optional(),
});

export type InventoryUpdateRequest = z.infer<typeof InventoryUpdateRequestSchema>;

export const InventoryToDeleteSchema = z.object({
  id: z.string().uuid(),
  version: z.number().int().min(1),
});

export type InventoryToDelete = z.infer<typeof InventoryToDeleteSchema>;

export const DeleteInventoriesBodySchema = z.object({
  inventories: z.array(InventoryToDeleteSchema).min(1).max(200, 'Too many inventories to delete'),
});

export type DeleteInventoriesBody = z.infer<typeof DeleteInventoriesBodySchema>;

export const DeleteInventoriesResponseSchema = z.object({
  deleted: z.number().int().nonnegative(),
  deletedIds: z.array(z.string().uuid()),
  conflicts: z.number().int().nonnegative(),
  conflictIds: z.array(z.string().uuid()),
  skipped: z.number().int().nonnegative(),
  skippedIds: z.array(z.string().uuid()),
});

export type DeleteInventoriesResponse = z.infer<typeof DeleteInventoriesResponseSchema>;

export const InventoryRoleEnum = z.enum(['OWNER', 'EDITOR', 'VIEWER']);

export type InventoryRole = z.infer<typeof InventoryRoleEnum>;

export const InventoryAccessUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
});

export const InventoryAccessDataItemSchema = z.object({
  userId: z.string().uuid(),
  inventoryRole: InventoryRoleEnum,
  user: InventoryAccessUserSchema,
});

export type InventoryAccessDataItem = z.infer<typeof InventoryAccessDataItemSchema>;

export const InventoryAccessDataSchema = z.array(InventoryAccessDataItemSchema);

export type InventoryAccessData = z.infer<typeof InventoryAccessDataSchema>;

export const InventoryAccessEntrySchema = z.object({
  userId: z.string().uuid(),
  inventoryRole: InventoryRoleEnum,
});

export type InventoryAccessEntry = z.infer<typeof InventoryAccessEntrySchema>;

export const UpsertAccessBodySchema = z.object({
  accesses: z.array(InventoryAccessEntrySchema).min(1).max(200, 'Too many users to update access'),
});

export type UpsertAccessBody = z.infer<typeof UpsertAccessBodySchema>;

export const UpsertAccessResponseSchema = z.object({
  processed: z.number().int().nonnegative(),
  created: z.number().int().nonnegative(),
  createdUserIds: z.array(z.string().uuid()),
  updated: z.number().int().nonnegative(),
  updatedUserIds: z.array(z.string().uuid()),
  unchanged: z.number().int().nonnegative(),
  unchangedUserIds: z.array(z.string().uuid()),
  skipped: z.number().int().nonnegative(),
  skippedInvalidOwnerUserIds: z.array(z.string().uuid()),
});

export type UpsertAccessResponse = z.infer<typeof UpsertAccessResponseSchema>;

export const RevokeAccessBodySchema = z.object({
  userIds: z.array(z.string().uuid()).min(1),
});

export type RevokeAccessBody = z.infer<typeof RevokeAccessBodySchema>;

export const RevokeAccessResponseSchema = z.object({
  deleted: z.number().int().nonnegative(),
  deletedUserIds: z.array(z.string().uuid()),
  skipped: z.number().int().nonnegative(),
  skippedOwnerUserIds: z.array(z.string().uuid()),
  notFound: z.number().int().nonnegative(),
  notFoundUserIds: z.array(z.string().uuid()),
});

export type RevokeAccessResponse = z.infer<typeof RevokeAccessResponseSchema>;

export const UpdateInventoryFieldsBodySchema = z.object({
  version: z.number().int().min(1),
  patch: z
    .record(z.string(), z.unknown())
    .refine((object) => Object.keys(object).length > 0, { message: 'Empty patch' }),
});

export type UpdateInventoryFieldsBody = z.infer<typeof UpdateInventoryFieldsBodySchema>;

export const UpdateInventoryFieldsResponseSchema = z.object({
  inventoryId: z.string().uuid(),
  version: z.number().int(),
});

export type UpdateInventoryFieldsResponse = z.infer<typeof UpdateInventoryFieldsResponseSchema>;

export const UpdateIdFormatBodySchema = z.object({
  schema: z.any(),
  version: z.number().int().min(1).optional(),
});

export type UpdateIdFormatBody = z.infer<typeof UpdateIdFormatBodySchema>;

export const NumericStatsSchema = z.object({
  avg: z.number().nullable(),
  min: z.number().nullable(),
  max: z.number().nullable(),
  count: z.number().int().nonnegative(),
});

export const TextStatsItemSchema = z.object({
  value: z.string(),
  count: z.number().int().positive(),
});

export const InventoryStatisticsSchema = z.object({
  itemsCount: z.number().int().nonnegative(),
  numericFields: z.record(z.string(), NumericStatsSchema),
  textFields: z.record(z.string(), z.array(TextStatsItemSchema)),
  firstItemCreatedAt: z.string().nullable(),
  lastItemCreatedAt: z.string().nullable(),
});

export type InventoryStatistics = z.infer<typeof InventoryStatisticsSchema>;
