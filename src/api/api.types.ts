import type { User } from '../shared/types/main.types';

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string };

export type AuthResponse = User & { token: string };
