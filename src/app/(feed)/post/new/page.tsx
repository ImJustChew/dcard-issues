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

const PostEditorContainer = () => {
    const router = useRouter();
    const editor = useEditor({
        extensions: [
          StarterKit,
          ImageExtended,
          Dropcursor,
          CodeBlock,
          Link,
          Placeholder.configure({
            placeholder: ({ node }) => {
              return 'Can you add some further context?'
            },
          }),
        ],
        content: `
          <p>
            … if you pass a custom document. That’s the beauty of having full control over the schema.
          </p>
        `,
        editorProps: {
          attributes: {
            class: 'prose prose-neutral mx-auto focus:outline-none',
          },
        }
    })

    const [title, setTitle] = useState('')
    const session = useSession();
    console.log(session.data)

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

    return <div className="flex flex-col w-full">
        {/* giant unsyled input for title */}
        <Button variant='ghost' className='w-full text-left' onClick={handlePublish}>Publish</Button>
        <input type="text" placeholder="Title" className="font-bold text-3xl w-full border-b" value={title} onChange={(e) => setTitle(e.target.value)} />
        {/* {issue.user && <div className='flex flex-row gap-2'>
            <Image src={issue.user.avatar_url} alt='avatar' width={24} height={24} className='rounded-full' />
            <p>@{issue.user.login}</p>
        </div>} */}
        <Tiptap editor={editor} />
    </div>
}

const NewPostPage = () => {
    return <PostEditorContainer />
}

export default NewPostPage;