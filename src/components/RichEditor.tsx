'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
  bucket?: string; // Bucket pour les images (histoire, legende, monument, etc.)
  entityId?: number; // ID de l'entité pour organiser les images
  placeholder?: string;
}

export default function RichEditor({ 
  content, 
  onChange, 
  bucket = 'histoire',
  entityId,
  placeholder = 'Commencez à écrire...'
}: RichEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rich-editor-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-amber-600 hover:text-amber-700 underline',
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none p-6 min-h-[200px]',
      },
    },
  });

  const addImage = useCallback(async () => {
    if (!editor) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        // Générer un nom de fichier unique
        const fileExt = file.name.split('.').pop();
        const fileName = `${entityId || Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload vers Supabase Storage
        const { error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file);

        if (error) {
          console.error('Erreur upload:', error);
          alert('Erreur lors de l\'upload de l\'image');
          return;
        }

        // Obtenir l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        // Insérer l'image dans l'éditeur
        editor.chain().focus().setImage({ src: publicUrl }).run();
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'upload de l\'image');
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  }, [editor, bucket, entityId]);

  const addLink = useCallback(() => {
    if (!editor) return;

    const url = window.prompt('URL du lien:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Barre d'outils */}
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
        {/* Formatage du texte */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('bold')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          Gras
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('italic')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          Italique
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('strike')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          Barré
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Titres */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          H1
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          H3
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Listes */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          Liste
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          Numérotée
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Citation */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          Citation
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Média */}
        <button
          onClick={addImage}
          disabled={isUploading}
          className="px-3 py-1 rounded text-sm font-medium bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 transition-colors"
          type="button"
        >
          {isUploading ? 'Upload...' : '📷 Image'}
        </button>

        <button
          onClick={addLink}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('link')
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          🔗 Lien
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Couleurs */}
        <input
          type="color"
          onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
          className="w-8 h-6 rounded border border-gray-300 cursor-pointer"
          title="Couleur du texte"
        />

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('highlight')
              ? 'bg-yellow-400 text-black'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          Surligner
        </button>
      </div>

      {/* Zone d'édition */}
      <div className="min-h-[200px] max-h-[600px] overflow-y-auto">
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

// Styles CSS pour l'éditeur
const editorStyles = `
  .rich-editor-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 16px 0;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  .ProseMirror {
    outline: none;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }

  .ProseMirror h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #92400e;
  }

  .ProseMirror h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #b45309;
  }

  .ProseMirror h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #d97706;
  }

  .ProseMirror blockquote {
    border-left: 4px solid #f59e0b;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    background-color: #fffbeb;
    border-radius: 0 8px 8px 0;
  }

  .ProseMirror ul, .ProseMirror ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .ProseMirror li {
    margin: 0.5rem 0;
  }
`;

// Injecter les styles dans le document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = editorStyles;
  document.head.appendChild(styleSheet);
}
