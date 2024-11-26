import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '../ui/button';
import { Bold, Copy, Italic, Save } from 'lucide-react';

interface EditorProps {
  content: string;
  onSave: (content: string) => void;
}

const Editor = ({ content, onSave }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none dark:prose-invert min-h-[300px] max-h-[60vh] overflow-y-auto',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const handleSave = () => {
    const content = editor.getHTML();
    onSave(content);
  };

  const handleCopy = () => {
    const content = editor.getHTML();
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-primary text-white hover:text-white' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-primary text-white hover:text-white' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Сохранить
          </Button>
        </div>
      </div>
      <div className="border dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
