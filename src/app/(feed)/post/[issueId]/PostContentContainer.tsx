import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Separator } from '@/components/ui/separator';
import { IssueResponseType } from '@/types/posts';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';
import { PostEditingToolbar } from './PostEditingToolbar';

export const PostContentContainer = async ({ issue }: { issue: IssueResponseType; }) => {
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
    </div>;
};
