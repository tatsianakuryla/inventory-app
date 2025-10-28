import { z } from 'zod';

export class Validator {
  public static zodParse<T>(schema: z.ZodSchema<T>, value: unknown): T {
    return schema.parse(value);
  }
}
