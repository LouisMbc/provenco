'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SupabaseService } from '@/lib/supabaseService';
import SimpleContentDisplay from '@/components/SimpleContentDisplay';
import { Domaine } from '@/types/database';

export default function DomainesPage() {
  const [domaines, setDomaines] = useState<Domaine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDomaines() {
      try {
        setLoading(true);
        const data = await SupabaseService.getDomaines();
        setDomaines(data);
      } catch (error) {
        console.error('Erreur lors du chargement des domaines:', error);
        setDomaines([]);
      } finally {
        setLoading(false);
      }
    }
    loadDomaines();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              🏛️ Domaines Viticoles de Provence
            </h1>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Explorez les domaines et châteaux de Provence, gardiens des traditions viticoles 
              et créateurs des plus beaux vins de la région.
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-amber-500 bg-white transition ease-in-out duration-150">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement des domaines...
              </div>
            </div>
          ) : domaines.length === 0 ? (
            <div className="text-center mb-12">
              <p className="text-lg text-amber-700">
                Aucun domaine n&apos;est encore enregistré. Utilisez l&apos;administration pour ajouter du contenu.
              </p>
              
              {/* Actions de navigation */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/admin/domaines"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Gérer les domaines
                </Link>
                <Link
                  href="/appellations"
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voir les appellations
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {domaines.map((domaine) => (
                <div key={domaine.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {domaine.image_url && (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={domaine.image_url}
                        alt={domaine.nom}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{domaine.nom}</h3>
                    <div className="mb-2 text-sm text-gray-600">
                      {domaine.ville && <p><strong>Ville:</strong> {domaine.ville.nom}</p>}
                      {domaine.appellation && <p><strong>Appellation:</strong> {domaine.appellation.nom}</p>}
                      {domaine.adresse && <p><strong>Adresse:</strong> {domaine.adresse}</p>}
                    </div>
                    {domaine.description && (
                      <div className="text-gray-600">
                        <SimpleContentDisplay content={domaine.description} />
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
                href="/admin/domaines"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Gérer les domaines
              </Link>
              <Link
                href="/appellations"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voir les appellations
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Navigation dans l&apos;univers du vin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/appellations" className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                <h3 className="font-bold text-amber-900 mb-2">↑ Appellations</h3>
                <p className="text-sm text-amber-700">Découvrir les territoires viticoles</p>
              </Link>
              <Link href="/vins" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <h3 className="font-bold text-orange-900 mb-2">↓ Vins</h3>
                <p className="text-sm text-orange-700">Explorer les cuvées des domaines</p>
              </Link>
              <Link href="/cepages" className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <h3 className="font-bold text-red-900 mb-2">→ Cépages</h3>
                <p className="text-sm text-red-700">Connaître les variétés de raisin</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
