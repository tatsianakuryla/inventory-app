import { z } from 'zod';
import { IdSchema } from '../../shared/types/schemas';
import { RoleSchema, StatusSchema, LanguageSchema, ThemeSchema } from '../../shared/types/enums';

export const SORTABLE_USER_KEYS = [
  'name',
  'email',
  'role',
  'status',
  'createdAt',
  'updatedAt',
] as const;
export type SortableUserKeys = (typeof SORTABLE_USER_KEYS)[number];

export const SalesforceIntegrationSchema = z
  .object({
    userId: z.string(),
    accountId: z.string(),
  })
  .nullable()
  .optional();

export type SalesforceIntegration = z.infer<typeof SalesforceIntegrationSchema>;

export const UserListItemSchema = z.object({
  id: IdSchema,
  name: z.string(),
  email: z.string().email(),
  role: RoleSchema,
  status: StatusSchema,
  language: LanguageSchema,
  theme: ThemeSchema,
  version: z.number().int(),
  googleId: z.string().nullable().optional(),
  facebookId: z.string().nullable().optional(),
  salesforceIntegration: SalesforceIntegrationSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserListItem = z.infer<typeof UserListItemSchema>;

export const GetUsersResponseSchema = z.object({
  users: z.array(UserListItemSchema),
  meta: z.object({
    page: z.number().int(),
    perPage: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
    sortBy: z.enum(SORTABLE_USER_KEYS),
    order: z.enum(['asc', 'desc']),
    search: z.string(),
    hasMore: z.boolean(),
  }),
});

export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;

export const UsersQuerySchema = z.object({
  page: z.number().int().min(1).optional(),
  perPage: z.number().int().min(1).max(100).optional(),
  sortBy: z.enum(SORTABLE_USER_KEYS).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
});

export type UsersQuery = z.infer<typeof UsersQuerySchema>;

export const UpdateUserSchema = z.object({
  id: IdSchema,
  version: z.number().int(),
});

export const UpdateUsersRequestSchema = z.array(UpdateUserSchema).min(1).max(100);

export type UpdateUserItem = z.infer<typeof UpdateUserSchema>;
export type UpdateUsersRequest = z.infer<typeof UpdateUsersRequestSchema>;

export const UpdateUsersResponseSchema = z.object({
  updated: z.number().int(),
  updatedIds: z.array(z.string()),
  skipped: z.number().int(),
  skippedIds: z.array(z.string()),
  message: z.string(),
});

export type UpdateUsersResponse = z.infer<typeof UpdateUsersResponseSchema>;

export const DeleteUsersRequestSchema = z.object({
  ids: z
    .array(z.string().trim())
    .min(1, 'At least one id is required')
    .max(100, 'Too many ids (max 100)'),
});

export type DeleteUsersRequest = z.infer<typeof DeleteUsersRequestSchema>;

export const DeleteUsersResponseSchema = z.object({
  deleted: z.number().int(),
  skipped: z.number().int(),
  skippedIds: z.array(z.string()),
});

export type DeleteUsersResponse = z.infer<typeof DeleteUsersResponseSchema>;
