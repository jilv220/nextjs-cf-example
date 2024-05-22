'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Scrypt, generateIdFromEntropySize } from 'lucia';
import { userTable } from '@/db/schemas';
import { getLuciaFromContext, initLucia, validateRequest } from '@/lib/auth';
import { initDrizzle } from '@/db/drizzle';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { insertUserSchema } from '@/validator/user';

interface ActionResult {
  error?: string;
}

export async function signup(_: any, formData: FormData) {
  const parseRes = insertUserSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parseRes.success) {
    const errors = parseRes.error.format();
    return {
      emailErrors: errors.email?._errors || [],
      passwordErrors: errors.password?._errors || [],
    };
  }

  const { password, email } = parseRes.data;

  const scrpyt = new Scrypt();
  const hashedPassword = await scrpyt.hash(password);
  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: db error, email taken, etc
  const { env } = getRequestContext();
  const db = initDrizzle(env.DB);
  await db.insert(userTable).values({
    id: userId,
    email,
    hashedPassword,
  });

  const lucia = initLucia(db);
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect('/');
}

export async function signout(redirectPath = '/'): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  const lucia = getLuciaFromContext();
  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect(redirectPath);
}
