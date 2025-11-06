import { z } from 'zod';
import { UserSchema } from '../UserService/user.schemas';
import { EmailSchema, type ResponseError } from '../../shared/types/schemas';

export const AuthResponseSchema = UserSchema;

export const LoginPayloadSchema = z.object({
  email: EmailSchema,
  password: z.string().trim().min(6),
});

export const RegisterPayloadSchema = z.object({
  name: z.string().trim().min(1),
  email: EmailSchema,
  password: z.string().trim().min(6),
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
/** @deprecated Use ResponseError from shared/types/schemas instead */
export type ApiErrorBody = ResponseError;
export const FbCompletedSchema = z.object({
  authResponse: z.object({
    accessToken: z.string().min(1),
  }),
});
