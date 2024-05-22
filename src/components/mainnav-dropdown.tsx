'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { signout } from '@/app/actions/session';
import { User } from 'lucia';

type MainNavDropDownProps = {
  user: User;
};

export function MainNavDropDown({ user }: MainNavDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" variant="outline" size="icon">
          <Avatar className="h-10 w-10">
            <AvatarImage
              className="rounded-full"
              src={user.avatarUrl || ''}
              alt="author image"
              width={32}
              height={32}
            />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            await signout();
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
