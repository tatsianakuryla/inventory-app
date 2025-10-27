import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Min 6 characters'),
});

export type LoginValues = z.infer<typeof LoginSchema>;

export const DEFAULT_LOGIN_VALUES = { email: '', password: '' };
