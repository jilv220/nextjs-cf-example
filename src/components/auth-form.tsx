'use client';

import { useRef } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function AuthForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form ref={ref} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" />
      </div>
      <Button className="flex w-full">Log In</Button>
    </form>
  );
}
