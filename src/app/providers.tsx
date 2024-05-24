'use client';

import { SessionContextType, SessionProvider } from '@/components/session-context';
import { ThemeProvider } from 'next-themes';

export default function Providers({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SessionContextType;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider value={value}>{children}</SessionProvider>
    </ThemeProvider>
  );
}
