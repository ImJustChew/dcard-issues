'use client';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Dropcursor from '@tiptap/extension-dropcursor';
import Tiptap from "@/components/editor/Tiptap";
import { Button } from "@/components/ui/button";
import { NodeHtmlMarkdown } from 'node-html-markdown';
import CodeBlock from '@tiptap/extension-code-block';
import ImageExtended from '@/components/editor/ImageExtended';
import Link from '@tiptap/extension-link';
import {publishPost, updatePublishedPost} from '@/app/(feed)/post/new/page.actions';
import { useMemo, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from 'next-auth/react';

export const PostEditorContainer = ({ initialPost }: { initialPost?: { title: string, content: string, issueId: string } }) => {
    const router = useRouter();
    const [isContentEmpty, setIsContentEmpty] = useState(initialPost ? (initialPost.content.trim().length < 30): true);
    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtended,
            Dropcursor,
            CodeBlock,
            Link,
            Placeholder,
        ],
        editorProps: {
            attributes: {
                class: 'prose prose-neutral mx-auto focus:outline-none',
            },
        },
        content: initialPost?.content,
        onUpdate({ editor }) {
            // check if editor has > 30 words
            const words = editor.getText().trim().length > 30;
            setIsContentEmpty(!words);
        }
    });

    const [title, setTitle] = useState(initialPost?.title ?? '');
    const isTitleEmpty = useMemo(() => title.trim().length < 5, [title]);

    const isValidPost = useMemo(() => {
        return !isTitleEmpty && !isContentEmpty;
    }, [isContentEmpty, title]);

    const handlePublish = async () => {
        if (!editor) return;
        try {
            const nhm = new NodeHtmlMarkdown({
                keepDataImages: true,
            });
            const html = editor.getHTML();
            if(!initialPost) {
                // create new post
                await publishPost(title, nhm.translate(html));
                toast({
                    title: 'Post published',
                    description: 'Your post has been published',
                });
                router.push('/');
            } else {
                // update existing post
                await updatePublishedPost(initialPost.issueId, title, nhm.translate(html));
                toast({
                    title: 'Post updated',
                    description: 'Your post has been updated',
                });
                router.push(`/post/${initialPost.issueId}`);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Failed to publish post',
                description: 'Please try again later',
            });
        }
    };

    const session = useSession();

    return <div className="flex flex-col w-full items-center">

        <div className="flex flex-col max-w-[65ch] w-full gap-4">
            <div className='flex flex-row gap-2 items-center w-full'>
                <div className='flex-1 w-full'>
                    {!initialPost ? 
                        <p className='text-sm text-gray-600'>Publishing to Repository</p>:
                        <p className='text-sm text-gray-600'>Editing post #{initialPost.issueId}</p>}
                    <p className='text-sm text-gray-600'>as {session.data?.user.name}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <Button variant='default' className='w-full text-left' onClick={handlePublish} disabled={!isValidPost}>Publish</Button>
                </div>
            </div>
            {/* giant unsyled input for title */}
            <TextareaAutosize placeholder="Title" className="font-bold text-3xl w-full break-words overflow-hidden resize-none auto" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Separator />
            {editor && <Tiptap editor={editor} />}
        </div>
    </div>;
};
