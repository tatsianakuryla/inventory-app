import { AxiosHeaders } from 'axios';

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function isAxiosHeaders(header: unknown): header is AxiosHeaders {
  return header instanceof AxiosHeaders;
}
