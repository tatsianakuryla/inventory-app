import { z } from 'zod';

export const OdooApiTokenResponseSchema = z.object({
  token: z.string(),
});

export type OdooApiTokenResponse = z.infer<typeof OdooApiTokenResponseSchema>;
