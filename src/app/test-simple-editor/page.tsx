'use client';

import { useState } from 'react';
import Link from 'next/link';
import SimpleEditor from '@/components/SimpleEditor';
import SimpleContentDisplay from '@/components/SimpleContentDisplay';

export default function TestSimpleEditorPage() {
  const [content, setContent] = useState('<p>Testez l\'éditeur simple ici...</p>');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test de l&apos;Éditeur Simple avec Images
          </h1>
          <p className="text-gray-600">
            Testez les fonctionnalités : gras, italique, titres, listes et <strong>upload d&apos;images</strong>.
          </p>
        </div>

        {/* Éditeur */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Éditeur avec Upload d&apos;Images</h2>
          <SimpleEditor
            content={content}
            onChange={setContent}
            placeholder="Écrivez votre contenu ici et ajoutez des images..."
            bucket="content"
            entityId={Date.now()}
          />
        </div>

        {/* Prévisualisation */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Prévisualisation</h2>
          <SimpleContentDisplay content={content} />
        </div>

        {/* HTML généré */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">HTML généré</h2>
          <pre className="text-green-400 text-sm overflow-x-auto">
            <code>{content}</code>
          </pre>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/test-histoire"
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Test Histoire
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Administration
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
