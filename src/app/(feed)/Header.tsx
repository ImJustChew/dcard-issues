import { getServerSession } from "next-auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import { GithubLoginButton } from "@/components/login/GithubLoginButton";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/login/UserMenu";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export const Header = async () => {
    const session = await getServerSession(authOptions);

    return <div className="h-12 px-4 py-1 flex flex-row items-center">
        <div className="flex-1 h-full flex flex-row items-center">
            <h1 className="text-xl font-medium">Blogs</h1>
        </div>
        <div className="flex flex-row gap-2 items-center">
            {session && <Link href='/post/new'>
                <Button variant='outline' size='sm'><Plus className="w-4 h-4 mr-2" /> New Post</Button>
            </Link>}
            {!session && <GithubLoginButton />}
            {session && <UserMenu />}
        </div>
    </div>;
};
