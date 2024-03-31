import { FC, PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/login/SignOutButton";
import { GithubLoginButton } from "@/components/login/GithubLoginButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const UserMenu: FC<PropsWithChildren> = ({ children }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

}

const Header = async () => {
    const session = await getServerSession(authOptions);


    return <div className="h-12 px-4 py-1 flex flex-row items-center">
        <div className="flex-1 h-full flex flex-row items-center">
            <h1 className="text-xl font-medium">Blogs</h1>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <Button variant='ghost'><Plus className="w-4 h-4 mr-2"/> New Post</Button>
            {!session && <GithubLoginButton />}
            {session && <UserMenu>
                <Image src={session.user.image} alt='avatar' width={32} height={32} className='rounded-full w-8 h-8' />
            </UserMenu>}
        </div>
    </div>
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