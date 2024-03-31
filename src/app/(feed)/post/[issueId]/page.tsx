import { Separator } from '@/components/ui/separator';
import { getPostById } from '@/lib/posts';
import {IssueResponseType} from '@/types/posts';
import { format } from 'date-fns';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {remark} from 'remark'
import html from 'remark-html';

type PostPageProps = {
    params: {
        issueId: string;
    };
};

const PostContentContainer = ({ issue }: { issue: IssueResponseType }) => {
    const content = remark().use(html).processSync(issue.body ?? "").toString();

    return <div className='flex flex-col px-4'>
        <div className='flex flex-col gap-2'>
            <div className='py-4'>
                <Link href='/' className='flex flex-row items-center hover:text-primary'>
                    <ChevronLeft className='w-4 h-4 mr-1' />
                    <p className='text-sm'>Back</p>
                </Link>
            </div>
            <div className='flex flex-col gap-2 py-4'>
                <h1 className='font-bold text-3xl'>{issue.title}</h1>
                {issue.user && <div className='flex flex-row gap-2'>
                    <Image src={issue.user.avatar_url} alt='avatar' width={24} height={24} className='rounded-full' />
                    <p>{issue.user.login}</p>
                    <p>{format(new Date(issue.created_at), 'PPpp')}</p>
                </div>}
            </div>
            <Separator />
            <article className="prose prose-neutral" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
}

const PostPage = async ({ params: { issueId }}: PostPageProps) => {
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