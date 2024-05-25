'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { insertUserSchema } from '@/validator/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { signup } from '@/app/actions/session';
import Link from 'next/link';

function SignupForm() {
  const form = useForm<z.infer<typeof insertUserSchema>>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = form;

  async function onSubmit(values: z.infer<typeof insertUserSchema>) {
    await signup(values);
    reset();
  }

  const [passwordInputType, setPasswordInputType] = useState('password');
  const isRevealPassword = passwordInputType === 'text';

  const toggleRevealPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRevealPassword) {
      setPasswordInputType('password');
    } else {
      setPasswordInputType('text');
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={passwordInputType} {...field} />
                    <Button
                      className="absolute top-0 right-2 bottom-0 hover:bg-inherit"
                      variant="ghost"
                      size="icon"
                      onClick={toggleRevealPassword}
                    >
                      {isRevealPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="flex w-full" type="submit" disabled={!isDirty || !isValid}>
            Sign Up
          </Button>
          <div className="text-xs text-muted-foreground">
            {`By creating an account you agree to the `}
            <Link className="underline underline-offset-4" href="/term-of-service">
              Term of Service
            </Link>
            {` and our `}
            <Link className="underline underline-offset-4" href="/privacy-policy">
              Privacy Policy
            </Link>
            {` We'll occasionally send you emails about news, products, and services; you can
            opt-out anytime.`}
          </div>
        </form>
      </Form>
    </>
  );
}

export default function AuthForm() {
  const pathname = usePathname();
  return <>{pathname === '/login' ? null : <SignupForm />}</>;
}
