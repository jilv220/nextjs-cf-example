import LoginCard from '@/components/login-card';
import { Suspense } from 'react';

export const runtime = 'edge';

export default function LoginPage() {
  return (
    <div className="container">
      <div className="mt-6 flex flex-col items-center justify-center">
        <Suspense>
          <LoginCard />
        </Suspense>
      </div>
    </div>
  );
}
