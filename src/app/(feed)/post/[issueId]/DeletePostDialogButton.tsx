import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deletePost } from '@/lib/posts';
import { Trash } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const DeletePostDialogButton = ({ issueId }: { issueId: string; }) => {

    const handleDelete = async () => {
        'use server';
        try {
            const session = await getServerSession(authOptions);
            if (!session) return redirect('/login');

            await deletePost(issueId, session?.accessToken);
            redirect('/');
        } catch (error) {
            return redirect('/login');
        }
    };

    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant='secondary' size="icon"><Trash /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    You are deleting your post. This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <form action={handleDelete} className='flex flex-row gap-2'>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit">Delete</AlertDialogAction>
                </form>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>;
};
