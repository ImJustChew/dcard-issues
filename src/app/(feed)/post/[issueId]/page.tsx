import { getPostById } from '@/lib/posts';
import { redirect } from 'next/navigation';
import { PostContentContainer } from './PostContentContainer';
import { Metadata } from 'next';

type PostPageProps = {
    params: {
        issueId: string;
    };
};

export async function generateMetadata({ params: { issueId } }: PostPageProps) {
    if (!issueId) {
        redirect('/404');
        return;
    }
    const issue = await getPostById(issueId);
    return {
        title: issue.title,
        description: (issue.body ?? "").slice(0, 100),
        authors: [issue.user?.login],
        openGraph: {
            title: issue.title,
            description: (issue.body ?? "").slice(0, 100),
            authors: [issue.user?.login],
            type: 'article',
            url: `https://dcard-issues.vercel.app/post/${issueId}`,
            image: {
                url: 'https://dcard-issues.vercel.app/logo.png',
                alt: 'Dcard Issues',
            },
        },
    } as Metadata;
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