'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SupabaseService } from '@/lib/supabaseService';
import SimpleContentDisplay from '@/components/SimpleContentDisplay';
import { Cepage } from '@/types/database';

export default function CepagesPage() {
  const [cepages, setCepages] = useState<Cepage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCepages() {
      try {
        setLoading(true);
        const data = await SupabaseService.getCepages();
        setCepages(data);
      } catch (error) {
        console.error('Erreur lors du chargement des cépages:', error);
        setCepages([]);
      } finally {
        setLoading(false);
      }
    }
    loadCepages();
  }, []);

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

          {loading ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-amber-500 bg-white transition ease-in-out duration-150">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement des cépages...
              </div>
            </div>
          ) : cepages.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {cepages.map((cepage) => (
                <div key={cepage.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {cepage.image_url && (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={cepage.image_url}
                        alt={cepage.nom}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{cepage.nom}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cepage.couleur === 'rouge' ? 'bg-red-100 text-red-800' :
                        cepage.couleur === 'blanc' ? 'bg-yellow-100 text-yellow-800' :
                        cepage.couleur === 'rosé' ? 'bg-pink-100 text-pink-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {cepage.couleur}
                      </span>
                    </div>
                    {cepage.description && (
                      <div className="text-gray-600">
                        <SimpleContentDisplay content={cepage.description} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mb-12">
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
