'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Scrypt, generateIdFromEntropySize } from 'lucia';
import { db } from '@/db/drizzle';
import { userTable } from '@/db/schemas';
import { lucia, validateRequest } from '@/lib/auth';

interface ActionResult {
  error?: string;
}

export async function signup(_: any, formData: FormData): Promise<ActionResult> {
  const username = formData.get('username');
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: 'Invalid username',
    };
  }
  const password = formData.get('password');
  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return {
      error: 'Invalid password',
    };
  }

  const scrpyt = new Scrypt();
  const hashedPassword = await scrpyt.hash(password);

  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used
  await db.insert(userTable).values({
    id: userId,
    username,
    hashedPassword,
  });

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

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect(redirectPath);
}
