import type { User } from '../shared/types/main.types';
import { type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string };

export type AuthResponse = User & { token: string };

export type UseAuthMethods = {
  me: UseQueryResult<User, Error>;
  login: UseMutationResult<AuthResponse, unknown, LoginPayload>;
  register: UseMutationResult<AuthResponse, unknown, RegisterPayload>;
  googleLogin: UseMutationResult<AuthResponse, unknown, string>;
  facebookLogin: UseMutationResult<AuthResponse, unknown, string>;
  logout: UseMutationResult<void, unknown, void>;
};

export type ApiErrorBody = { message?: string };
