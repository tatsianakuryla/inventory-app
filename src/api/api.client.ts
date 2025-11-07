import axios, { isAxiosError } from 'axios';
import { API_BASE_URL } from './api.requestRoutes';
import { useUserStore } from '../stores/useUserStore';
import { extractMessage, onAuthPage, toAuthError, toRejection } from './helpers/api.helpers';
import type { ResponseError } from '../shared/types/schemas';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => toRejection(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!isAxiosError<ResponseError>(error)) return toRejection(error);
    if (!error.response) return toRejection(error);
    if (error.config?.headers?.['X-Skip-Auth-Interceptor']) {
      return toRejection(error);
    }
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
