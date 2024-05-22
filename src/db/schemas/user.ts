import { sqliteTable, text, integer, numeric } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const userTable = sqliteTable('user', {
  id: text('id').primaryKey(),
  username: text('username').unique(),
  hashedPassword: text('hashed_password'), // oauth user does not have password
  githubId: numeric('github_id').unique(),
  avatarUrl: text('avatar_url'),
});

export const sessionTable = sqliteTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
    }),
  expiresAt: integer('expires_at').notNull(),
});

export const insertUserSchema = createInsertSchema(userTable);
export type DatabaseUser = Omit<z.infer<typeof insertUserSchema>, 'id' | 'hashedPassword'>;
