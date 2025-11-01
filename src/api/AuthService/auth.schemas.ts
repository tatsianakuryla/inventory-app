import { z } from 'zod';
import { UserSchema } from '../UserService/user.schemas';

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
export type ApiErrorBody = { error?: string; message?: string };
export const FbCompletedSchema = z.object({
  authResponse: z.object({
    accessToken: z.string().min(1),
  }),
});
