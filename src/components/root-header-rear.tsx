import Link from 'next/link';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import { MainNavDropDown } from './mainnav-dropdown';
import { validateRequest } from '@/lib/auth';

export default async function RootHeaderRear() {
  const { user } = await validateRequest();
  return (
    <>
      {!user ? (
        <>
          <Link href="/login"> Log In</Link>
          <Button asChild>
            <Link href="/signup"> Sign Up</Link>
          </Button>
        </>
      ) : (
        <>
          <ThemeToggle />
          <MainNavDropDown user={user} />
        </>
      )}
    </>
  );
}
