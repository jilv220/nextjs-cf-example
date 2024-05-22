import { userTable } from '@/db/schemas';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const EMAIL_ERR = 'Not a valid email';
const PASSWD_TOO_SHORT_ERR = 'Use 8 characters or more for your password';
const PASSWD_TOO_LONG_ERR = 'Use 64 characters or more for your password';

export const insertUserSchema = createInsertSchema(userTable, {
  email: (schema) =>
    schema.email
      .email({
        message: EMAIL_ERR,
      })
      .min(1, {
        message: EMAIL_ERR,
      }),
})
  .pick({
    email: true,
  })
  .extend({
    password: z
      .string()
      .min(8, {
        message: PASSWD_TOO_SHORT_ERR,
      })
      .max(64, {
        message: PASSWD_TOO_LONG_ERR,
      }),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
