import React, { PropsWithChildren } from 'react';
import { PostRouteProps } from '@/app/(feed)/post/[issueId]/page.type';
import { redirect } from 'next/navigation';

const Layout: React.FC<PropsWithChildren<PostRouteProps>> = ({ children, params: { issueId } }) => {
    if (!issueId) {
        redirect('/404');
    }
    return <div className="flex flex-col items-center">
        <div className="flex flex-col w-full max-w-[65ch]">
            {children}
        </div>
    </div>

};

export default Layout;