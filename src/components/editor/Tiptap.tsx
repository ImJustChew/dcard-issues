import { FloatingMenu, BubbleMenu, EditorContent, Editor } from '@tiptap/react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Strikethrough } from 'lucide-react';

const Tiptap = ({ editor }: { editor: Editor}) => {
  return (
    <>
      {editor && <BubbleMenu className="bg-background" tippyOptions={{ duration: 100 }} editor={editor}>
        <ToggleGroup type="multiple">
          <ToggleGroupItem
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </BubbleMenu>}
      <EditorContent editor={editor}/>
    </>
  )
}

export default Tiptap
