import { Button } from "@/components/ui/button";
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
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive("bold") ? "default" : "outline"}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    Bold
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive("italic") ? "default" : "outline"}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    Italic
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive("heading", { level: 1 }) ? "default" : "outline"}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    H1
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive("paragraph") ? "default" : "outline"}
                    onClick={() => editor?.chain().focus().setParagraph().run()}
                >
                    P
                </Button>
                <input type="file" accept="image/*" onChange={insertImage} />
            </div>
            <div className="rounded border p-2">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
