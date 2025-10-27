import { api } from './api.client';
import type { User } from '../shared/types/main.types';
import { USERS_ROUTES } from '../shared/constants/constants';
import type { LoginPayload, RegisterPayload, AuthResponse } from './api.types';

export class AuthService {
  public static async me(): Promise<User> {
    const { data } = await api.get<User>(USERS_ROUTES.ME);
    return data;
  }

  public static async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(USERS_ROUTES.LOGIN, payload);
    return data;
  }

  public static async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(USERS_ROUTES.REGISTER, payload);
    return data;
  }

  public static async googleLogin(idToken: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(USERS_ROUTES.GOOGLE_LOGIN, { idToken });
    return data;
  }

  public static async facebookLogin(accessToken: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(USERS_ROUTES.FACEBOOK_LOGIN, { accessToken });
    return data;
  }
}
