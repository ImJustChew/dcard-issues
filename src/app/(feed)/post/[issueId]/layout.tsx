import React, { PropsWithChildren } from 'react';
import {PostRouteProps} from '@/app/(feed)/post/[issueId]/page.type';
import { redirect } from 'next/navigation';

const Layout: React.FC<PropsWithChildren<PostRouteProps>> = ({ children, params: { issueId } }) => {
    if (!issueId) {
        redirect('/404');
    }
    return (children);
};

export default Layout;