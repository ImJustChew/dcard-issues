import { getPostById } from '@/lib/posts';
import { redirect } from 'next/navigation';
import { PostContentContainer } from './PostContentContainer';
import { Metadata } from 'next';
import { PostRouteProps } from './page.type';

export async function generateMetadata({ params: { issueId } }: PostRouteProps) {
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
    const issue = await getPostById(issueId);
    return <PostContentContainer issue={issue} />
}

export default PostPage;