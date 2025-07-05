"use client"

import type React from "react"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import CharacterCount from "@tiptap/extension-character-count"
import Typography from "@tiptap/extension-typography"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
} from "lucide-react"
import { useEffect } from "react"

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Comece a escrever sua história...",
  className,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      CharacterCount,
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      // Exemplo de como obter HTML com quebras de linha
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6 whitespace-pre-wrap",
        style: "white-space: pre-wrap;",
      },
    },
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`h-8 w-8 p-0 ${isActive ? "bg-[#009c3b] hover:bg-[#009c3b]/90" : ""}`}
    >
      {children}
    </Button>
  )

  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-[#e2e2e2] p-3 bg-[#f8f9fa]">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex gap-1 mr-3">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              title="Negrito (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              title="Itálico (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
              title="Riscado"
            >
              <Strikethrough className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              isActive={editor.isActive("highlight")}
              title="Destacar"
            >
              <Highlighter className="w-4 h-4" />
            </ToolbarButton>
          </div>

          {/* Headings */}
          <div className="flex gap-1 mr-3">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive("heading", { level: 1 })}
              title="Título 1"
            >
              <Heading1 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive("heading", { level: 2 })}
              title="Título 2"
            >
              <Heading2 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive("heading", { level: 3 })}
              title="Título 3"
            >
              <Heading3 className="w-4 h-4" />
            </ToolbarButton>
          </div>

          {/* Text Alignment */}
          <div className="flex gap-1 mr-3">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              isActive={editor.isActive({ textAlign: "left" })}
              title="Alinhar à esquerda"
            >
              <AlignLeft className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              isActive={editor.isActive({ textAlign: "center" })}
              title="Centralizar"
            >
              <AlignCenter className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              isActive={editor.isActive({ textAlign: "right" })}
              title="Alinhar à direita"
            >
              <AlignRight className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
              isActive={editor.isActive({ textAlign: "justify" })}
              title="Justificar"
            >
              <AlignJustify className="w-4 h-4" />
            </ToolbarButton>
          </div>

          {/* Lists and Quotes */}
          <div className="flex gap-1 mr-3">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              title="Lista com marcadores"
            >
              <List className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              title="Lista numerada"
            >
              <ListOrdered className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              title="Citação"
            >
              <Quote className="w-4 h-4" />
            </ToolbarButton>
          </div>

          {/* Divider and Undo/Redo */}
          <div className="flex gap-1">
            <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Linha horizontal">
              <Minus className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Desfazer (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Refazer (Ctrl+Y)"
            >
              <Redo className="w-4 h-4" />
            </ToolbarButton>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <EditorContent
          editor={editor}
          className="min-h-[400px] prose-headings:text-[#131313] prose-p:text-[#131313] prose-strong:text-[#131313] prose-blockquote:border-l-[#009c3b] prose-blockquote:text-[#6e6e6e]"
        />

        {/* Character Count */}
        <div className="absolute bottom-4 right-4 text-xs text-[#6e6e6e] bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
          {editor.storage.characterCount.characters()} caracteres
        </div>
      </div>

      {/* Footer with shortcuts */}
      <div className="border-t border-[#e2e2e2] p-2 bg-[#f8f9fa] text-xs text-[#6e6e6e]">
        <div className="flex flex-wrap gap-4">
          <span>
            <kbd className="bg-white px-1 rounded">Ctrl+B</kbd> Negrito
          </span>
          <span>
            <kbd className="bg-white px-1 rounded">Ctrl+I</kbd> Itálico
          </span>
          <span>
            <kbd className="bg-white px-1 rounded">Ctrl+Z</kbd> Desfazer
          </span>
          <span>
            <kbd className="bg-white px-1 rounded">Ctrl+Y</kbd> Refazer
          </span>
          <span>
            <kbd className="bg-white px-1 rounded">/</kbd> Comandos rápidos
          </span>
        </div>
      </div>
    </Card>
  )
}