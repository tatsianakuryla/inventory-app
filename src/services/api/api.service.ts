import axios, { isAxiosError, AxiosHeaders } from 'axios';
import { API_BASE_URL, AUTH_PAGES } from '../../shared/constants/constants';
import { useAuthStore } from '../../stores/auth.store';
import {
  extractMessage,
  isCurrentPathOneOf,
  toAuthError,
  toRejection,
} from '../helpers/api.helpers';
import { isAxiosHeaders } from '../../shared/typeguards/typeguards';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      if (!config.headers) config.headers = new AxiosHeaders();
      if (isAxiosHeaders(config.headers)) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        const headers = AxiosHeaders.from(config.headers);
        headers.set('Authorization', `Bearer ${token}`);
        config.headers = headers;
      }
    }
    return config;
  },
  (error) => toRejection(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!isAxiosError<{ error?: string; message?: string }>(error)) return toRejection(error);
    const { response } = error;
    if (!response) return toRejection(error);
    const { status, data } = response;
    const message = extractMessage(data);
    const isOnAuthPages = isCurrentPathOneOf(AUTH_PAGES);
    const authError = toAuthError(status, message);
    const shouldForceLogout = Boolean(authError) && !isOnAuthPages;
    if (shouldForceLogout) {
      const { setAuthError, setReturnTo, logout } = useAuthStore.getState();
      setAuthError(authError);
      setReturnTo();
      logout({ redirect: true });
    }
    return toRejection(error);
  }
);
