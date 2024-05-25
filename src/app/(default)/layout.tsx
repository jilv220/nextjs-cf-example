import { RootHeader } from '@/components/root-header';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RootHeader />
      {children}
    </>
  );
}
