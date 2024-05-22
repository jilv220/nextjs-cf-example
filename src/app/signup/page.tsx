'use client';

export const runtime = 'edge';

import { useFormState } from 'react-dom';
import { signup } from '../actions/session';
import { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Page() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, signupAction] = useFormState(signup, {
    emailErrors: [],
    passwordErrors: [],
  });

  return (
    <>
      <h1>Create an account</h1>
      <form
        ref={ref}
        action={(formData) => {
          signupAction(formData);
          ref.current?.reset();
        }}
      >
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" />
        {state.emailErrors.length > 0 && <p>{state.emailErrors.at(0)}</p>}
        <br />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" />
        {state.passwordErrors.length > 0 && <p>{state.passwordErrors.at(0)}</p>}
        <br />
        <Button>Continue</Button>
      </form>
    </>
  );
}
