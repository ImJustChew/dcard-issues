'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {createPost} from '@/lib/posts';

export const publishPost = async (title: string, content: string) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Unauthorized');
    }
    await createPost(title, content, session.accessToken);
}