import { drizzle } from 'drizzle-orm/d1';
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

import { getRequestContext } from '@cloudflare/next-on-pages';
import { sessionTable, userTable } from './schemas';

const { env } = getRequestContext();
export const db = drizzle(env.DB);
export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);