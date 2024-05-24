'use client';

import { validateRequest } from '@/lib/auth';
import { createContext, useContext } from 'react';

export type SessionContextType = Awaited<ReturnType<typeof validateRequest>>;

const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContextType }>) => {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
