'use server';
import { getServerSession } from "next-auth";
import { createPost, updatePost } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const publishPost = async (title: string, content: string) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Unauthorized');
    }
    await createPost(title, content, session.accessToken);
    revalidatePath(`/`);
}

export const updatePublishedPost = async (issueId: string, title: string, content: string) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Unauthorized');
    }
    await updatePost(issueId, title, content, session.accessToken);
    revalidatePath(`/`);
    revalidatePath(`/post/${issueId}`);
    revalidatePath(`/post/${issueId}/edit`);
}