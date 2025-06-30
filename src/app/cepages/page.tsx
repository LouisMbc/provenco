import React from 'react';
import Link from 'next/link';

export default function CepagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              🍇 Cépages de Provence
            </h1>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Explorez les variétés de raisin qui donnent naissance aux vins de Provence, 
              des cépages traditionnels méditerranéens aux variétés autochtones rares.
            </p>
          </div>

          <div className="text-center mb-12">
            <p className="text-lg text-amber-700">
              Aucun cépage n&apos;est encore enregistré. Utilisez l&apos;administration pour ajouter du contenu.
            </p>
            
            {/* Actions de navigation */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/admin/cepages"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Gérer les cépages
              </Link>
              <Link
                href="/vins"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voir les vins
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Navigation dans l&apos;univers du vin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/appellations" className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                <h3 className="font-bold text-amber-900 mb-2">Appellations</h3>
                <p className="text-sm text-amber-700">Cépages autorisés par appellation</p>
              </Link>
              <Link href="/domaines" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <h3 className="font-bold text-orange-900 mb-2">Domaines</h3>
                <p className="text-sm text-orange-700">Spécialités et encépagement des domaines</p>
              </Link>
              <Link href="/vins" className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <h3 className="font-bold text-red-900 mb-2">Vins</h3>
                <p className="text-sm text-red-700">Assemblages et cépages des cuvées</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
