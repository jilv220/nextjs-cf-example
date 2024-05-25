import { Card, CardFooter } from './ui/card';
import { Github } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { GoogleIcon } from './brand-icons';
import DiscordIcon from './brand-icons/discord-icon';
import Divider from './ui/divider';
import AuthForm from './auth-form';
import AuthHeader from './auth-header';

export default async function AuthFragment() {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/');
  }

  return (
    <Card className="md:w-[40%]">
      <AuthHeader />
      <CardFooter className="w-full flex-col p-10 pt-0">
        <div className="flex flex-col gap-2 w-full">
          <AuthForm />
          <Divider text="or" />
          <Button asChild>
            <Link href="/login/github">
              <Github className="mr-2 h-4 w-4" />
              Sign in with Github
            </Link>
          </Button>
          {/* only stub, implement them urself */}
          <Button asChild>
            <Link href="/login/google">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login/discord">
              <DiscordIcon className="mr-2 h-4 w-4" />
              Sign in with Discord
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
