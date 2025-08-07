import { Button } from "@/components/ui/button";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type React from "react";
import { useEffect, useState } from "react";

interface Props {
    content: string;
    onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: Props) {
    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-500 underline cursor-pointer hover:text-blue-700",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Underline,
        ],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto px-4 py-2 focus:outline-none min-h-[200px]",
            },
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

    const addLink = () => {
        if (linkUrl) {
            editor?.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
            setLinkUrl("");
            setShowLinkDialog(false);
        }
    };

    const removeLink = () => {
        editor?.chain().focus().unsetLink().run();
    };

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="w-full">
            {/* Toolbar */}
            <div className="mb-4 rounded-t-lg border border-gray-200 bg-gray-50 p-3">
                <div className="flex flex-wrap items-center gap-1">
                    {/* Text Formatting */}
                    <div className="mr-2 flex items-center gap-1 border-r border-gray-300 pr-2">
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("bold") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            title="Tebal"
                        >
                            <strong>B</strong>
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("italic") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            title="Miring"
                        >
                            <em>I</em>
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("underline") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleUnderline().run()}
                            title="Garis Bawah"
                        >
                            <u>U</u>
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("strike") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleStrike().run()}
                            title="Coret"
                        >
                            <s>S</s>
                        </Button>
                    </div>

                    {/* Headings */}
                    <div className="mr-2 flex items-center gap-1 border-r border-gray-300 pr-2">
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("heading", { level: 1 }) ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                            title="Judul 1"
                        >
                            H1
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("heading", { level: 2 }) ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                            title="Judul 2"
                        >
                            H2
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("heading", { level: 3 }) ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                            title="Judul 3"
                        >
                            H3
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("paragraph") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().setParagraph().run()}
                            title="Paragraf"
                        >
                            P
                        </Button>
                    </div>

                    {/* Lists */}
                    <div className="mr-2 flex items-center gap-1 border-r border-gray-300 pr-2">
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("bulletList") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            title="Daftar Bullet"
                        >
                            • List
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("orderedList") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                            title="Daftar Bernomor"
                        >
                            1. List
                        </Button>
                    </div>

                    {/* Alignment */}
                    <div className="mr-2 flex items-center gap-1 border-r border-gray-300 pr-2">
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive({ textAlign: "left" }) ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
                            title="Rata Kiri"
                        >
                            ⬅
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive({ textAlign: "center" }) ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
                            title="Rata Tengah"
                        >
                            ↔
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive({ textAlign: "right" }) ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
                            title="Align Right"
                        >
                            ➡
                        </Button>
                    </div>

                    {/* Quote and Code */}
                    <div className="mr-2 flex items-center gap-1 border-r border-gray-300 pr-2">
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("blockquote") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                            title="Quote"
                        >
                            Quote
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("code") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleCode().run()}
                            title="Inline Code"
                        >
                            &lt;/&gt;
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant={editor?.isActive("codeBlock") ? "default" : "outline"}
                            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                            title="Code Block"
                        >
                            Code Block
                        </Button>
                    </div>

                    {/* Links and Media */}
                    <div className="flex items-center gap-1">
                        <Button type="button" size="sm" variant="outline" onClick={() => setShowLinkDialog(!showLinkDialog)} title="Add Link">
                            🔗
                        </Button>
                        {editor?.isActive("link") && (
                            <Button type="button" size="sm" variant="outline" onClick={removeLink} title="Remove Link">
                                🔗❌
                            </Button>
                        )}
                        <label className="cursor-pointer">
                            <Button type="button" size="sm" variant="outline" title="Insert Image" asChild>
                                <span>📷</span>
                            </Button>
                            <input type="file" accept="image/*" onChange={insertImage} className="hidden" />
                        </label>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                            title="Horizontal Rule"
                        >
                            ─
                        </Button>
                    </div>
                </div>

                {/* Link Dialog */}
                {showLinkDialog && (
                    <div className="mt-3 flex items-center gap-2 rounded border border-gray-200 bg-white p-3">
                        <input
                            type="url"
                            placeholder="Enter URL..."
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addLink();
                                }
                            }}
                        />
                        <Button type="button" size="sm" onClick={addLink}>
                            Add
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => setShowLinkDialog(false)}>
                            Cancel
                        </Button>
                    </div>
                )}
            </div>

            {/* Editor */}
            <div className="min-h-[300px] rounded-b-lg border border-gray-200 bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
