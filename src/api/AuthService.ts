import { api } from './api.client';
import type { User } from '../shared/types/main.types';
import { USERS_ROUTES } from '../shared/constants/constants';
import type { LoginPayload, RegisterPayload, AuthResponse } from './api.types';

export class AuthService {
  public static me = async (): Promise<User> => {
    const { data } = await api.get<User>(USERS_ROUTES.ME);
    return data;
  };

  public static login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(USERS_ROUTES.LOGIN, payload);
    return data;
  };

  public static register = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(USERS_ROUTES.REGISTER, payload);
    return data;
  };

  public static googleLogin = async (idToken: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(USERS_ROUTES.GOOGLE_LOGIN, { idToken });
    return data;
  };

  public static facebookLogin = async (accessToken: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(USERS_ROUTES.FACEBOOK_LOGIN, { accessToken });
    return data;
  };

  public static logout = async (): Promise<void> => {
    await api.post(USERS_ROUTES.LOGOUT);
  };
}
