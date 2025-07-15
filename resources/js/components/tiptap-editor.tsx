import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type React from "react";
import { useEffect } from "react";

interface Props {
    content: string;
    onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                allowBase64: true,
            }),
        ],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    const insertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;
        const reader = new FileReader();
        reader.onload = () => {
            const src = reader.result as string;
            editor.chain().focus().setImage({ src }).run();
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content]);

    return (
        <div>
            <input type="file" accept="image/*" onChange={insertImage} className="mb-2" />
            <div className="rounded border p-2">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
