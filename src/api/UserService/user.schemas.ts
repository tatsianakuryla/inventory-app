import { z } from 'zod';
import { IdSchema, VersionSchema, EmailSchema } from '../../shared/types/schemas';
import {
  RoleSchema,
  StatusSchema,
  LanguageSchema,
  ThemeSchema,
  LANGUAGES,
  THEMES,
} from '../../shared/types/enums';
import { VALIDATION_LIMITS, VALIDATION_MESSAGES } from '../../shared/constants/validation';

export const SalesforceIntegrationSchema = z
  .object({
    userId: z.string(),
    accountId: z.string(),
  })
  .nullable()
  .optional();

export type SalesforceIntegration = z.infer<typeof SalesforceIntegrationSchema>;

export const UserSchema = z.object({
  id: IdSchema,
  email: EmailSchema.optional().nullable(),
  name: z.string().min(VALIDATION_LIMITS.NAME_MIN),
  role: RoleSchema,
  status: StatusSchema,
  language: LanguageSchema,
  theme: ThemeSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  version: z.number().int(),
  googleId: z.string().nullable().optional(),
  facebookId: z.string().nullable().optional(),
  salesforceIntegration: SalesforceIntegrationSchema,
});

export type User = z.infer<typeof UserSchema>;

export const UpdateProfileRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(VALIDATION_LIMITS.NAME_MIN, VALIDATION_MESSAGES.NAME_REQUIRED)
    .max(VALIDATION_LIMITS.NAME_MAX)
    .optional(),
  language: z.string().trim().toUpperCase().pipe(z.enum(LANGUAGES)).optional(),
  theme: z.string().trim().toUpperCase().pipe(z.enum(THEMES)).optional(),
  version: VersionSchema,
});

export type UpdateUserRequest = z.infer<typeof UpdateProfileRequestSchema>;

export const UpdateUserResponseSchema = UserSchema;
export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>;

export { type Role, type Status, type Language, type Theme } from '../../shared/types/enums';
