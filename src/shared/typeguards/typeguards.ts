import { AxiosHeaders } from 'axios';
import { ZodError } from 'zod';

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function isAxiosHeaders(header: unknown): header is AxiosHeaders {
  return header instanceof AxiosHeaders;
}

export function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}
