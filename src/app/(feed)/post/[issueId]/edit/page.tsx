import { PostEditorContainer } from "../../new/PostEditorContainer";
import {getPostById} from '@/lib/posts';
import {PostRouteProps} from '@/app/(feed)/post/[issueId]/page.type';
import {remark} from 'remark';
import html from 'remark-html';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';

const NewPostPage = async ({ params: { issueId } }: PostRouteProps) => {
    const issue = await getPostById(issueId);
    const content = remark().use(remarkGfm).use(html).processSync(issue.body ?? "").toString();
    return <div className="px-2 flex flex-col items-center">
        <div className="flex flex-col max-w-[65ch]">
            <div className='py-4'>
                <Link href='/' className='flex flex-row items-center hover:text-primary'>
                    <ChevronLeft className='w-4 h-4 mr-1' />
                    <p className='text-sm'>Back</p>
                </Link>
            </div>
            <PostEditorContainer initialPost={{ title: issue.title, content: content, issueId: String(issue.number) }} />
        </div>
    </div>
}

export default NewPostPage;