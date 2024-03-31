import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { deletePost, getPostById } from '@/lib/posts';
import { IssueResponseType } from '@/types/posts';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { ArrowLeft, ChevronLeft, Edit, Trash } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { remark } from 'remark'
import html from 'remark-html';

type PostPageProps = {
    params: {
        issueId: string;
    };
};

const DeletePostDialogButton = ({ issueId }: { issueId: string }) => {

    const handleDelete = async () => {
        'use server';
        try {
            const session = await getServerSession(authOptions);
            if(!session) return redirect('/login');
            
            await deletePost(issueId, session?.accessToken);
            redirect('/');
        } catch (error) {
            return redirect('/login');
        }
    }

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
    </AlertDialog>
}

const PostEditingToolbar = ({ issueId }: { issueId: string }) => {
    return <div className='flex flex-row gap-2'>
        <Button variant='secondary' size="icon"><Edit /></Button>
        <DeletePostDialogButton issueId={issueId} />
    </div>
}

const PostContentContainer = async ({ issue }: { issue: IssueResponseType }) => {
    const content = remark().use(html).processSync(issue.body ?? "").toString();
    const session = await getServerSession(authOptions);
    const isAuthor = issue.user?.id == session?.id;

    return <div className='flex flex-col px-4'>
        <div className='flex flex-col gap-2'>
            <div className='py-4'>
                <Link href='/' className='flex flex-row items-center hover:text-primary'>
                    <ChevronLeft className='w-4 h-4 mr-1' />
                    <p className='text-sm'>Back</p>
                </Link>
            </div>
            <div className='flex flex-col gap-2 py-4'>
                <p className='text-sm text-secondary'>{format(new Date(issue.created_at), 'PPpp')}</p>
                <h1 className='font-bold text-3xl'>{issue.title}</h1>
                {issue.user && <div className='flex flex-row gap-2'>
                    <Image src={issue.user.avatar_url} alt='avatar' width={24} height={24} className='rounded-full' />
                    <p>@{issue.user.login}</p>
                </div>}
            </div>
            {isAuthor && <PostEditingToolbar issueId={String(issue.id)} />}
            <Separator />
            <article className="prose prose-neutral" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
}

const PostPage = async ({ params: { issueId } }: PostPageProps) => {
    if (!issueId) {
        redirect('/404');
        return null;
    }
    const issue = await getPostById(issueId);
    return <div className='flex flex-col gap-4'>
        <PostContentContainer issue={issue} />
    </div>
}

export default PostPage;