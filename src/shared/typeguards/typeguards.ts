import { SERVER_SORTABLE_KEYS_MAP, type ServerSortableKey } from '../types/main.types';

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function isValidDateObject(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function isServerSortableKey(value: string): value is ServerSortableKey {
  return value in SERVER_SORTABLE_KEYS_MAP;
}

type CustomIdElement = { type: string; [key: string]: unknown };
export type CustomIdFormatSchema = {
  maxLength?: number;
  elements: CustomIdElement[];
};

export function isCustomIdFormatSchema(value: unknown): value is CustomIdFormatSchema {
  if (typeof value !== 'object' || value === null) return false;
  const maybe: { elements?: unknown } = value;
  if (!Array.isArray(maybe.elements)) return false;
  return maybe.elements.every(
    (element) => typeof element === 'object' && element !== null && 'type' in element
  );
}
