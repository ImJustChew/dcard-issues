import SignOutSignOutDropdownMenuItem from "@/components/login/SignOutDropdownMenuItem";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";


export const UserMenu = async () => {
    const session = (await getServerSession(authOptions))!;
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Image src={session.user.image} alt='avatar' width={32} height={32} className='rounded-full w-8 h-8' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <SignOutSignOutDropdownMenuItem />
        </DropdownMenuContent>
    </DropdownMenu>;

};
