import axios, { isAxiosError, AxiosHeaders } from 'axios';
import { API_BASE_URL } from './api.requestRoutes';
import { useUserStore } from '../stores/useUserStore';
import { extractMessage, onAuthPage, toAuthError, toRejection } from './helpers/api.helpers';
import { isAxiosHeaders } from '../shared/typeguards/typeguards';
import type { ResponseError } from '../shared/types/schemas';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken;
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
    if (!isAxiosError<ResponseError>(error)) return toRejection(error);
    if (!error.response) return toRejection(error);
    const { status, data } = error.response;
    const authError = toAuthError(status, extractMessage(data));
    if (authError) {
      const { setAuthError, logout } = useUserStore.getState();
      setAuthError(authError);
      logout({ redirect: !onAuthPage() });
    }
    return toRejection(error);
  }
);
