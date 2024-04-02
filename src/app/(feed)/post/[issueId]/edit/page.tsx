import { PostEditorContainer } from "@/components/editor/PostEditorContainer";
import { getPostById } from '@/lib/posts';
import { PostRouteProps } from '@/app/(feed)/post/[issueId]/page.type';
import { remark } from 'remark';
import html from 'remark-html';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

const NewPostPage = async ({ params: { issueId } }: PostRouteProps) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/404');
    }
    const issue = await getPostById(issueId);
    const content = remark().use(remarkGfm).use(html).processSync(issue.body ?? "").toString();
    return <>
        <div className='py-4'>
            <Link href={`/post/${issueId}`} className='flex flex-row items-center hover:text-primary'>
                <ChevronLeft className='w-4 h-4 mr-1' />
                <p className='text-sm'>Back</p>
            </Link>
        </div>
        <PostEditorContainer initialPost={{ title: issue.title, content: content, issueId: String(issue.number) }} />
    </>
}

export default NewPostPage;