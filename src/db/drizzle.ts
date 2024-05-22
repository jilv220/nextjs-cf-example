import { drizzle } from 'drizzle-orm/d1';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const initDrizzle = (D1: D1Database) => {
  const { env } = getRequestContext();
  return drizzle(env.DB);
};

export const getDBFromContext = () => {
  const { env } = getRequestContext();
  return initDrizzle(env.DB);
};
