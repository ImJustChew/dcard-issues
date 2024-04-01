'use client';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Dropcursor from '@tiptap/extension-dropcursor'
import Tiptap from "@/components/editor/Tiptap";
import { Button } from "@/components/ui/button";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown'
import CodeBlock from '@tiptap/extension-code-block';
import ImageExtended from '@/components/editor/ImageExtended';
import Link from '@tiptap/extension-link';
import {publishPost} from '@/app/(feed)/post/new/page.actions';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';

const PostEditorContainer = () => {
    const router = useRouter();
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
        }
    })

    const [title, setTitle] = useState('')
    const session = useSession();

    const handlePublish = async () => {
        if(!editor) return;
        try {
            const nhm = new NodeHtmlMarkdown({
                keepDataImages: true,
            });
            const html = editor.getHTML();
            await publishPost(title, nhm.translate(html));
            toast({
                title: 'Post published',
                description: 'Your post has been published',
            });
            router.push('/');
        } catch (error) {
            console.error(error);
            toast({
                title: 'Failed to publish post',
                description: 'Please try again later',
            });
        }
    }

    return <div className="flex flex-col w-full items-center">
        <div className="flex flex-col max-w-[65ch] w-full gap-4">
            {/* giant unsyled input for title */}
            <Button variant='ghost' className='w-full text-left' onClick={handlePublish}>Publish</Button>
            <input type="text" placeholder="Title" className="font-bold text-3xl w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Separator />
            {editor && <Tiptap editor={editor} />}
        </div>
    </div>
}

const NewPostPage = () => {
    return <PostEditorContainer />
}

export default NewPostPage;