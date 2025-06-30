import React from 'react';
import Link from 'next/link';

export default function VinsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              🍷 Vins de Provence
            </h1>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Découvrez les cuvées emblématiques de Provence, des rosés rafraîchissants 
              aux rouges de garde, en passant par les blancs minéraux.
            </p>
          </div>

          {/* Filtres par type */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="px-6 py-2 bg-rose-100 text-rose-800 rounded-full font-semibold hover:bg-rose-200 transition-colors">
              🌹 Rosé
            </button>
            <button className="px-6 py-2 bg-red-100 text-red-800 rounded-full font-semibold hover:bg-red-200 transition-colors">
              🍇 Rouge
            </button>
            <button className="px-6 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold hover:bg-yellow-200 transition-colors">
              🥂 Blanc
            </button>
            <button className="px-6 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold hover:bg-purple-200 transition-colors">
              🍯 Doux Naturel
            </button>
          </div>

          <div className="text-center mb-12">
            <p className="text-lg text-amber-700">
              Aucun vin n&apos;est encore enregistré. Utilisez l&apos;administration pour ajouter du contenu.
            </p>
            
            {/* Actions de navigation */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/admin/vins"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Gérer les vins
              </Link>
              <Link
                href="/domaines"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voir les domaines
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Structure hiérarchique</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-amber-600">↑</span>
                <Link href="/appellations" className="font-semibold text-amber-600 hover:text-amber-700">
                  Appellation
                </Link>
                <span className="text-amber-700">→</span>
                <Link href="/domaines" className="font-semibold text-orange-600 hover:text-orange-700">
                  Domaine
                </Link>
                <span className="text-amber-700">→</span>
                <span className="font-semibold text-red-600">Vin</span>
              </div>
              <div className="ml-16 space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-red-600">├──</span>
                  <Link href="/cepages" className="font-semibold text-purple-600 hover:text-purple-700">
                    Cépages utilisés
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-red-600">└──</span>
                  <span className="font-semibold text-green-600">Type de vin</span>
                  <span className="text-amber-700">(Rosé, Rouge, Blanc, Doux Naturel)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
