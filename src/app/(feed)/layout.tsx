import { FC, PropsWithChildren } from "react";
import SignOutSignOutDropdownMenuItem from "@/components/login/SignOutDropdownMenuItem";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Header } from "./Header";

export const UserMenu: FC<PropsWithChildren> = ({ children }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Posts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <SignOutSignOutDropdownMenuItem />
        </DropdownMenuContent>
    </DropdownMenu>

}

const BlogsViewerLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen w-full">
            <Header />
            <div className="flex-1 overflow-y-auto py-2 px-8">
                {children}
            </div>
        </div>
    );
}

export default BlogsViewerLayout;