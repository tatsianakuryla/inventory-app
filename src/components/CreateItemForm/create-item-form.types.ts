import type { ItemCreateRequest } from '../../api/ItemsService/items.schemas';

export type TextKey =
  | 'text1'
  | 'text2'
  | 'text3'
  | 'long1'
  | 'long2'
  | 'long3'
  | 'link1'
  | 'link2'
  | 'link3';

export type NumberKey = 'num1' | 'num2' | 'num3';
export type BooleanKey = 'bool1' | 'bool2' | 'bool3';
export type AnyKey = TextKey | NumberKey | BooleanKey;

const TEXT_KEYS_ARRAY: string[] = [
  'text1',
  'text2',
  'text3',
  'long1',
  'long2',
  'long3',
  'link1',
  'link2',
  'link3',
];
const NUMBER_KEYS_ARRAY: string[] = ['num1', 'num2', 'num3'];
const BOOLEAN_KEYS_ARRAY: string[] = ['bool1', 'bool2', 'bool3'];

const TEXT_KEYS_SET: ReadonlySet<string> = new Set(TEXT_KEYS_ARRAY);
const NUMBER_KEYS_SET: ReadonlySet<string> = new Set(NUMBER_KEYS_ARRAY);
const BOOLEAN_KEYS_SET: ReadonlySet<string> = new Set(BOOLEAN_KEYS_ARRAY);
const ANY_KEYS_SET: ReadonlySet<string> = new Set([
  ...TEXT_KEYS_ARRAY,
  ...NUMBER_KEYS_ARRAY,
  ...BOOLEAN_KEYS_ARRAY,
]);

const TEXT_KEYS_CHECK: Record<TextKey, true> = {
  text1: true,
  text2: true,
  text3: true,
  long1: true,
  long2: true,
  long3: true,
  link1: true,
  link2: true,
  link3: true,
};
const NUMBER_KEYS_CHECK: Record<NumberKey, true> = { num1: true, num2: true, num3: true };
const BOOLEAN_KEYS_CHECK: Record<BooleanKey, true> = { bool1: true, bool2: true, bool3: true };
const ANY_KEYS_CHECK: Record<AnyKey, true> = {
  ...TEXT_KEYS_CHECK,
  ...NUMBER_KEYS_CHECK,
  ...BOOLEAN_KEYS_CHECK,
};

export const isTextKey = (key: string): key is TextKey =>
  TEXT_KEYS_SET.has(key) && key in TEXT_KEYS_CHECK;

export const isNumberKey = (key: string): key is NumberKey =>
  NUMBER_KEYS_SET.has(key) && key in NUMBER_KEYS_CHECK;

export const isBooleanKey = (key: string): key is BooleanKey =>
  BOOLEAN_KEYS_SET.has(key) && key in BOOLEAN_KEYS_CHECK;

export const isAnyKey = (key: string): key is AnyKey =>
  ANY_KEYS_SET.has(key) && key in ANY_KEYS_CHECK;

export const isItemCreateKey = (key: string): key is keyof ItemCreateRequest => isAnyKey(key);
