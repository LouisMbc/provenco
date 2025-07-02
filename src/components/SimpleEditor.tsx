'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface SimpleEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  bucket?: string; // Bucket pour les images (histoire, legende, monument, etc.)
  entityId?: number; // ID de l'entité pour organiser les images
}

export default function SimpleEditor({ 
  content, 
  onChange, 
  placeholder = 'Commencez à écrire...',
  bucket = 'content',
  entityId
}: SimpleEditorProps) {
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
          class: 'simple-editor-image',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none p-4 min-h-[150px]',
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
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file);

        if (error) {
          console.error('Erreur upload détaillée:', {
            message: error.message,
            bucket: bucket,
            filePath: filePath,
            error: error
          });
          alert(`Erreur lors de l'upload: ${error.message}. Vérifiez que le bucket '${bucket}' existe dans Supabase.`);
          return;
        }

        console.log('Upload réussi:', data);

        // Obtenir l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        // Insérer l'image dans l'éditeur avec des attributs personnalisés
        editor.chain().focus().setImage({ 
          src: publicUrl,
          alt: `Image ${file.name}`,
          title: file.name
        }).run();
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'upload de l\'image');
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  }, [editor, bucket, entityId]);

  if (!editor) {
    return <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Barre d'outils simple */}
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
        {/* Formatage de base */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('bold')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
          title="Gras"
        >
          <strong>B</strong>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('italic')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
          title="Italique"
        >
          <em>I</em>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Titres */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
          title="Titre"
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
          title="Sous-titre"
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
          title="Liste à puces"
        >
          • Liste
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
          title="Liste numérotée"
        >
          1. Liste
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Paragraphe normal */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('paragraph')
              ? 'bg-amber-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
          title="Paragraphe normal"
        >
          P
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Image */}
        <button
          onClick={addImage}
          disabled={isUploading}
          className="px-3 py-1 rounded text-sm font-medium bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 transition-colors"
          type="button"
          title="Insérer une image"
        >
          {isUploading ? '📤' : '🖼️'} {isUploading ? 'Upload...' : 'Image'}
        </button>
      </div>

      {/* Zone d'édition */}
      <div className="min-h-[150px] max-h-[400px] overflow-y-auto">
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
  .simple-editor-image {
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

  .ProseMirror ul, .ProseMirror ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .ProseMirror li {
    margin: 0.25rem 0;
  }

  .ProseMirror p {
    margin: 0.75rem 0;
  }

  .ProseMirror img {
    max-width: 100%;
    height: auto;
    margin: 1rem auto;
    display: block;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .ProseMirror img:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .ProseMirror img.inline {
    display: inline;
    margin: 0 0.5rem;
    vertical-align: middle;
    max-width: 200px;
  }
`;

// Injecter les styles dans le document
if (typeof document !== 'undefined') {
  const styleId = 'simple-editor-styles';
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    styleSheet.textContent = editorStyles;
    document.head.appendChild(styleSheet);
  }
}
