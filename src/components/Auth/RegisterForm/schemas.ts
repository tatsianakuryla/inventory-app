import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email('Enter a valid email'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(6, 'Min 6 characters'),
});

export type RegisterValues = z.infer<typeof RegisterSchema>;

export const DEFAULT_REGISTER_VALUES = { email: '', password: '', name: '' };
