'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <span className="text-6xl mb-4 block">⚠️</span>
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Une erreur s&apos;est produite
        </h2>
        <p className="text-amber-700 mb-6">
          Désolé, nous avons rencontré un problème lors du chargement de cette page.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-amber-300 text-base font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50 transition-all duration-200"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
