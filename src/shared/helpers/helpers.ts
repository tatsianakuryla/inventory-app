export function getTailWindClass(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const stableStringify = (value: unknown): string =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  JSON.stringify(value ?? {}, Object.keys((value as Record<string, unknown>) ?? {}).toSorted());
