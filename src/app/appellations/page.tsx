'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SupabaseService } from '@/lib/supabaseService';
import SimpleContentDisplay from '@/components/SimpleContentDisplay';
import { Appellation } from '@/types/database';

export default function AppellationsPage() {
  const [appellations, setAppellations] = useState<Appellation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppellations() {
      try {
        setLoading(true);
        const data = await SupabaseService.getAppellations();
        setAppellations(data);
      } catch (error) {
        console.error('Erreur lors du chargement des appellations:', error);
        setAppellations([]);
      } finally {
        setLoading(false);
      }
    }
    loadAppellations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              🍇 Appellations de Provence
            </h1>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Découvrez les prestigieuses appellations d&apos;origine contrôlée (AOC) de la région provençale, 
              chacune reflétant un terroir unique et une tradition viticole séculaire.
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-amber-500 bg-white transition ease-in-out duration-150">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement des appellations...
              </div>
            </div>
          ) : appellations.length === 0 ? (
            <div className="text-center mb-12">
              <p className="text-lg text-amber-700">
                Aucune appellation n&apos;est encore enregistrée. Utilisez l&apos;administration pour ajouter du contenu.
              </p>
              
              {/* Actions de navigation */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/admin/appellations"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Gérer les appellations
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {appellations.map((appellation) => (
                <div key={appellation.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {appellation.image_url && (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={appellation.image_url}
                        alt={appellation.nom}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{appellation.nom}</h3>
                    {appellation.region && (
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Région:</strong> {appellation.region}
                      </p>
                    )}
                    {appellation.description && (
                      <div className="text-gray-600">
                        <SimpleContentDisplay content={appellation.description} />
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
                href="/admin/appellations"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Gérer les appellations
              </Link>
              <Link
                href="/"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Structure hiérarchique</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                <span className="font-semibold text-amber-900">Appellation</span>
                <span className="text-amber-700">- Territoire délimité avec des règles strictes de production</span>
              </div>
              <div className="flex items-center space-x-4 ml-8">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <Link href="/domaines" className="font-semibold text-orange-600 hover:text-orange-700">
                  Domaines
                </Link>
                <span className="text-amber-700">- Producteurs au sein de l&apos;appellation</span>
              </div>
              <div className="flex items-center space-x-4 ml-16">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <Link href="/vins" className="font-semibold text-red-600 hover:text-red-700">
                  Vins
                </Link>
                <span className="text-amber-700">- Cuvées produites par les domaines</span>
              </div>
              <div className="flex items-center space-x-4 ml-24">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <Link href="/cepages" className="font-semibold text-purple-600 hover:text-purple-700">
                  Cépages
                </Link>
                <span className="text-amber-700">- Variétés de raisin utilisées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
