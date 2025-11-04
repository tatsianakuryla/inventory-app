import { AxiosHeaders } from 'axios';
import { ZodError } from 'zod';
import { SERVER_SORTABLE_KEYS_MAP, type ServerSortableKey } from '../types/main.types';

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function isAxiosHeaders(header: unknown): header is AxiosHeaders {
  return header instanceof AxiosHeaders;
}

export function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export function isValidDateObject(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function isServerSortableKey(value: string): value is ServerSortableKey {
  return value in SERVER_SORTABLE_KEYS_MAP;
}
