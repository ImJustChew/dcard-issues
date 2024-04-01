'use client';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { FC, PropsWithChildren } from 'react';

const NextAuthProvider: FC<PropsWithChildren<{ session: Session | null }>> = async ({ children, session }) => {
    return <SessionProvider session={session}>
        {children}
    </SessionProvider>
}

export default NextAuthProvider;