'use client';;
import { signOut } from "next-auth/react";
import {DropdownMenuItem} from '@/components/ui/dropdown-menu';
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

const SignOutDropdownMenuItem = (props: DropdownMenuProps) => {
    return <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/', redirect: true })} {...props}>Logout</DropdownMenuItem>;
};

export default SignOutDropdownMenuItem;