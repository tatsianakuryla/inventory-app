import { z } from 'zod';

export const ThemeSchema = z.enum(['LIGHT', 'DARK']);
export const LanguageSchema = z.enum(['EN', 'RU']);
export const RoleSchema = z.enum(['USER', 'ADMIN']);
export const StatusSchema = z.enum(['ACTIVE', 'BLOCKED']);
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: RoleSchema,
  status: StatusSchema,
  language: LanguageSchema,
  theme: ThemeSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  version: z.number().int().min(1),
  googleId: z.string().nullable(),
  facebookId: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const AuthResponseSchema = UserSchema.extend({
  token: z.string().min(1),
});

export const LoginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterPayloadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const GoogleLoginPayloadSchema = z.object({
  idToken: z.string().min(1),
});

export const FacebookLoginPayloadSchema = z.object({
  accessToken: z.string().min(1),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type RegisterPayload = z.infer<typeof RegisterPayloadSchema>;
