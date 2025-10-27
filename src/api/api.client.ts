import axios, { isAxiosError, AxiosHeaders } from 'axios';
import { API_BASE_URL } from '../shared/constants/constants';
import { useAuthStore } from '../hooks/use-auth-store';
import { extractMessage, onAuthPage, toAuthError, toRejection } from './helpers/api.helpers';
import { isAxiosHeaders } from '../shared/typeguards/typeguards';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (!token) return config;
    if (!config.headers) config.headers = new AxiosHeaders();
    const headers = isAxiosHeaders(config.headers)
      ? config.headers
      : AxiosHeaders.from(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
    return config;
  },
  (error) => toRejection(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!isAxiosError<{ error?: string; message?: string }>(error)) return toRejection(error);
    if (!error.response) return Promise.reject(error);
    const { status, data } = error.response;
    const authError = toAuthError(status, extractMessage(data));
    if (authError) {
      const { setAuthError, logout } = useAuthStore.getState();
      setAuthError(authError);
      logout({ redirect: !onAuthPage() });
    }
    return Promise.reject(error);
  }
);
