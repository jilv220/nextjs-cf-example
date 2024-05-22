import { Lucia, Session, User } from 'lucia';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { adapter } from '@/db/drizzle';
import { DatabaseUser } from '@/db/schemas';
import { cache } from 'react';
import { cookies } from 'next/headers';

// hmmm, bad DX
const workerEnv = getRequestContext().env.WORKER_ENV as string;

export const lucia = new Lucia(adapter, {
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

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
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
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUser;
  }
}
