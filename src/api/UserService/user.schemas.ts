import { z } from 'zod';

export const ThemeSchema = z.enum(['LIGHT', 'DARK']);
export type Theme = z.infer<typeof ThemeSchema>;
export const ThemeEnum = ThemeSchema.enum;

export const LanguageSchema = z.enum(['EN', 'RU']);
export type Language = z.infer<typeof LanguageSchema>;
export const LanguageEnum = LanguageSchema.enum;

export const RoleSchema = z.enum(['USER', 'ADMIN']);
export const StatusSchema = z.enum(['ACTIVE', 'BLOCKED']);
export const IdSchema = z.cuid().trim().min(1);

export const UserSchema = z.object({
  id: IdSchema,
  email: z.string().email().optional().nullable(),
  name: z.string().min(1),
  role: RoleSchema,
  status: StatusSchema,
  language: LanguageSchema,
  theme: ThemeSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  version: z.number().int().min(1),
  googleId: z.string().nullable().optional(),
  facebookId: z.string().nullable().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const VersionSchema = z.number().int().min(1);

export const UpdateProfileRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100).optional(),
  language: LanguageSchema.optional(),
  theme: ThemeSchema.optional(),
  version: VersionSchema,
});

export type UpdateUserRequest = z.infer<typeof UpdateProfileRequestSchema>;

export const UpdateUserResponseSchema = UserSchema;
export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>;
