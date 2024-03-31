import { FC, PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/login/SignOutButton";

const Sidebar = async () => {
    const session = await getServerSession(authOptions);
    
    
    return <div className="w-64 h-screen">
        <h1 className="text-2xl font-bold">Blogs</h1>
        {session && <SignOutButton/>}
    </div>
}

const BlogsViewerLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex flex-row gap-4 min-h-screen py-2 px-8 ">
            <Sidebar/>
            <div className="flex-1 h-full">
                {children}
            </div>
        </div>
    );
}

export default BlogsViewerLayout;