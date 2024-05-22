import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { validateRequest } from '@/lib/auth';
import { MainNavDropDown } from './mainnav-dropdown';
import { ThemeToggle } from './theme-toggle';

export async function RootHeader() {
  const { user } = await validateRequest();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95">
      <div className="container flex items-center space-x-2 h-14">
        <div className="flex-grow">
          <Link href="/">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={100}
              height={28}
              priority
            />
          </Link>
        </div>
        <div className="flex items-center space-x-3">
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
        </div>
      </div>
    </header>
  );
}
