'use client';;
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from 'next-auth/react';

export const GithubLoginButton = () => {
    return <Button onClick={() => signIn('github')}>
        <Github className="mr-2" /> GitHub
    </Button>;
};
