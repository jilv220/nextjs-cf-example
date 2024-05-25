import AuthFragment from '@/components/auth-fragment';
import { Suspense } from 'react';

export const runtime = 'edge';

export default function LoginPage() {
  return (
    <Suspense>
      <AuthFragment />
    </Suspense>
  );
}
