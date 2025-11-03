import { z } from 'zod';
import { IdSchema, VersionSchema, EmailSchema } from '../../shared/types/schemas';

export const ThemeSchema = z.enum(['LIGHT', 'DARK']);
export type Theme = z.infer<typeof ThemeSchema>;

export const LanguageSchema = z.enum(['EN', 'RU']);

export const RoleSchema = z.enum(['USER', 'ADMIN']);
export const StatusSchema = z.enum(['ACTIVE', 'BLOCKED']);

export const UserSchema = z.object({
  id: IdSchema,
  email: EmailSchema.optional().nullable(),
  name: z.string().min(1),
  role: RoleSchema,
  status: StatusSchema,
  language: LanguageSchema,
  theme: ThemeSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  version: z.number().int(),
  googleId: z.string().nullable().optional(),
  facebookId: z.string().nullable().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const UpdateProfileRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100).optional(),
  language: z
    .string()
    .trim()
    .toUpperCase()
    .pipe(z.enum(['EN', 'RU'] as const))
    .optional(),
  theme: z
    .string()
    .trim()
    .toUpperCase()
    .pipe(z.enum(['LIGHT', 'DARK'] as const))
    .optional(),
  version: VersionSchema,
});

export type UpdateUserRequest = z.infer<typeof UpdateProfileRequestSchema>;

export const UpdateUserResponseSchema = UserSchema;
export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>;
