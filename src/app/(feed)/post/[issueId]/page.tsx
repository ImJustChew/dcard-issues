import { getPostById } from '@/lib/posts';
import { redirect } from 'next/navigation';
import { PostContentContainer } from './PostContentContainer';
import { Metadata } from 'next';
import { PostRouteProps } from './page.type';

export async function generateMetadata({ params: { issueId } }: PostRouteProps) {
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
  

const PostPage = async ({ params: { issueId } }: PostRouteProps) => {
    if (!issueId) {
        redirect('/404');
        return null;
    }
    const issue = await getPostById(issueId);
    return <div className="px-2 flex flex-col items-center">
        <div className="flex flex-col max-w-[65ch]">
            <PostContentContainer issue={issue} />
        </div>
    </div>
}

export default PostPage;