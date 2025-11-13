import { z } from 'zod';
import { UserSchema } from '../UserService/user.schemas';
import { EmailSchema } from '../../shared/types/schemas';
import { VALIDATION_LIMITS, VALIDATION_MESSAGES } from '../../shared/constants/validation';

export const AuthResponseSchema = UserSchema.extend({
  token: z.string(),
});

export const LoginPayloadSchema = z.object({
  email: EmailSchema,
  password: z.string().trim().min(VALIDATION_LIMITS.PASSWORD_MIN, VALIDATION_MESSAGES.PASSWORD_MIN),
});

export const RegisterPayloadSchema = z.object({
  name: z.string().trim().min(VALIDATION_LIMITS.NAME_MIN, VALIDATION_MESSAGES.NAME_REQUIRED),
  email: EmailSchema,
  password: z.string().trim().min(VALIDATION_LIMITS.PASSWORD_MIN, VALIDATION_MESSAGES.PASSWORD_MIN),
});

export const GoogleLoginPayloadSchema = z.object({
  idToken: z.string().min(VALIDATION_LIMITS.TOKEN_MIN),
});

export const FacebookLoginPayloadSchema = z.object({
  accessToken: z.string().min(VALIDATION_LIMITS.TOKEN_MIN),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type RegisterPayload = z.infer<typeof RegisterPayloadSchema>;
