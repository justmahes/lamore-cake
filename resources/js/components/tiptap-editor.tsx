import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useEffect } from 'react';

interface Props {
    content: string;
    onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: Props) {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content]);

    return (
        <div className="border rounded p-2">
            <EditorContent editor={editor} />
        </div>
    );
}
