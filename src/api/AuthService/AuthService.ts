import { api } from '../api.client';
import { USERS_ROUTES } from '../api.requestRoutes';

import {
  AuthResponseSchema,
  LoginPayloadSchema,
  RegisterPayloadSchema,
  GoogleLoginPayloadSchema,
  FacebookLoginPayloadSchema,
  type AuthResponse,
  type LoginPayload,
  type RegisterPayload,
} from './auth.schemas';
import { Validator } from '../../validator/validator';
import { type User, UserSchema } from '../UserService/user.schemas';

export class AuthService {
  public static me = async (): Promise<User> => {
    const response = await api.get(USERS_ROUTES.ME);
    return Validator.zodParse(UserSchema, response.data);
  };

  public static login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const validRequestPayload = Validator.zodParse(LoginPayloadSchema, payload);
    const response = await api.post(USERS_ROUTES.LOGIN, validRequestPayload);
    return Validator.zodParse(AuthResponseSchema, response.data);
  };

  public static register = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const validRequestPayload = Validator.zodParse(RegisterPayloadSchema, payload);
    const response = await api.post(USERS_ROUTES.REGISTER, validRequestPayload);
    return Validator.zodParse(AuthResponseSchema, response.data);
  };

  public static googleLogin = async (idToken: string): Promise<AuthResponse> => {
    const validRequestPayload = Validator.zodParse(GoogleLoginPayloadSchema, { idToken });
    const response = await api.post(USERS_ROUTES.GOOGLE_LOGIN, validRequestPayload);
    return Validator.zodParse(AuthResponseSchema, response.data);
  };

  public static facebookLogin = async (accessToken: string): Promise<AuthResponse> => {
    const validRequestPayload = Validator.zodParse(FacebookLoginPayloadSchema, { accessToken });
    const response = await api.post(USERS_ROUTES.FACEBOOK_LOGIN, validRequestPayload);
    return Validator.zodParse(AuthResponseSchema, response.data);
  };

  public static logout = async (): Promise<void> => {
    await api.post(USERS_ROUTES.LOGOUT);
  };
}
