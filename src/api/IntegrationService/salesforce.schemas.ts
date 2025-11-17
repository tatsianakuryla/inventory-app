import { z } from 'zod';
import { EmailSchema, IdSchema } from '../../shared/types/schemas';
import { OptionalUrlSchema } from '../../shared/types/schemas';

export const SalesforceAccountCreateRequestSchema = z.object({
  Name: z.string().min(1, 'Name is required').max(255, 'Max Name length is 255 characters'),
  Website: OptionalUrlSchema,
});

export type SalesforceAccountCreateRequest = z.infer<typeof SalesforceAccountCreateRequestSchema>;

export const SalesforceContactCreateRequestSchema = z.object({
  FirstName: z
    .string()
    .min(1, 'FirstName is required')
    .max(40, 'Max length for The FirstName is 40 characters'),
  LastName: z
    .string()
    .min(1, 'LastName is Required')
    .max(80, 'Max length for The LastName is 80 characters'),
  Email: EmailSchema,
  AccountId: z.string().min(1),
});

export type SalesforceContactCreateRequest = z.infer<typeof SalesforceContactCreateRequestSchema>;

export const SalesforceAccountWithContactRequestSchema = z.object({
  account: SalesforceAccountCreateRequestSchema,
  contact: SalesforceContactCreateRequestSchema.omit({ AccountId: true }),
  userId: z.union([IdSchema, z.undefined()]).optional(),
});

export type SalesforceAccountWithContactRequest = z.infer<
  typeof SalesforceAccountWithContactRequestSchema
>;

export const SalesforceAccountWithContactResponseSchema = z.object({
  accountId: z.string().min(1),
  contactId: z.string().min(1),
});

export type SalesforceAccountWithContactResponse = z.infer<
  typeof SalesforceAccountWithContactResponseSchema
>;
