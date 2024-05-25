'use client';

import { usePathname } from 'next/navigation';
import { CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';

function LoginHeader() {
  return (
    <>
      <CardTitle className="text-3xl"> Log In</CardTitle>
      <div className="text-muted-foreground">
        New to Next Starter?{' '}
        <Link
          href="/signup"
          className="font-medium text-blue-500 hover:underline hover:underline-offset-4"
        >
          Sign up for an account
        </Link>
      </div>
    </>
  );
}

function SignupHeader() {
  return (
    <>
      <CardTitle className="text-3xl"> Sign Up</CardTitle>
      <div className="text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-500 hover:underline hover:underline-offset-4"
        >
          Log In
        </Link>
      </div>
    </>
  );
}

export default function AuthHeader() {
  const pathname = usePathname();
  return (
    <CardHeader className="space-y-0">
      {pathname === '/login' ? <LoginHeader /> : <SignupHeader />}
    </CardHeader>
  );
}
