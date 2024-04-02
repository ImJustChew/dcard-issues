import { FC, PropsWithChildren } from "react";
import { Header } from "./Header";

const BlogsViewerLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen w-full">
            <Header />
            <div className="flex-1 overflow-y-auto py-2 px-2 md:px-8">
                {children}
            </div>
        </div>
    );
}

export default BlogsViewerLayout;