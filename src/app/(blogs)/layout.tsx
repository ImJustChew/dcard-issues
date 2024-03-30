import { FC, PropsWithChildren } from "react";

const Sidebar = () => {
    return <div className="w-64 h-screen">
        <h1 className="text-2xl font-bold">Blogs</h1>
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