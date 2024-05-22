import { Lucia, Session, User } from 'lucia';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { DatabaseUser, sessionTable, userTable } from '@/db/schemas';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import { initDrizzle } from '@/db/drizzle';

export const initLucia = (D1: DrizzleD1Database) => {
  // hmmm, bad DX
  const workerEnv = getRequestContext().env.WORKER_ENV as string;
  const adapter = new DrizzleSQLiteAdapter(D1, sessionTable, userTable);

  return new Lucia(adapter, {
    sessionCookie: {
      // this sets cookies with super long expiration
      // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
      expires: false,
      attributes: {
        // set to `true` when using HTTPS
        secure: workerEnv === 'production',
      },
    },
    getUserAttributes: (attributes) => {
      return {
        username: attributes.username,
        avatarUrl: attributes.avatarUrl,
      };
    },
  });
};

export const getLuciaFromContext = () => {
  const { env } = getRequestContext();
  const drizzle = initDrizzle(env.DB);
  return initLucia(drizzle);
};

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const lucia = getLuciaFromContext();

    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch {}
    return result;
  }
);

declare module 'lucia' {
  interface Register {
    Lucia: ReturnType<typeof initLucia>;
    DatabaseUserAttributes: DatabaseUser;
  }
}
