'use client';
import { Button, ButtonProps } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = (props: ButtonProps) => {
    return <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/', redirect: true })} {...props}>Logout</Button>;
};

export default SignOutButton;