import { z } from 'zod';

export const ResponseErrorSchema = z.object({
  message: z.string(),
});

export type ResponseError = z.infer<typeof ResponseErrorSchema>;

export const IdSchema = z.string().trim().pipe(z.cuid());

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email({ message: 'Invalid email' }));

export const OptionalUrlSchema = z
  .union([z.string().trim().url(), z.literal(''), z.null(), z.undefined()])
  .transform((value) => {
    if (!value || value === '') return;
    return value;
  })
  .nullable();

export const VersionSchema = z.number().int().min(1);

export const PaginationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(20),
});

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const SearchQuerySchema = z.object({
  search: z.string().trim().default(''),
});

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
};

export const PaginatedSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
): z.ZodType<Paginated<z.infer<T>>> =>
  z.object({
    items: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    perPage: z.number().int().positive(),
    hasMore: z.boolean(),
  });
