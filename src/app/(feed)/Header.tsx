import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { GithubLoginButton } from "@/components/login/GithubLoginButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "./layout";

export const Header = async () => {
    const session = await getServerSession(authOptions);

    return <div className="h-12 px-4 py-1 flex flex-row items-center">
        <div className="flex-1 h-full flex flex-row items-center">
            <h1 className="text-xl font-medium">Blogs</h1>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <Link href='/post/new'>
                <Button variant='ghost'><Plus className="w-4 h-4 mr-2" /> New Post</Button>
            </Link>
            {!session && <GithubLoginButton />}
            {session && <UserMenu>
                <Image src={session.user.image} alt='avatar' width={32} height={32} className='rounded-full w-8 h-8' />
            </UserMenu>}
        </div>
    </div>;
};
