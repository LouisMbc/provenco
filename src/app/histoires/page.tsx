'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SupabaseService } from '@/lib/supabaseService';
import { Histoire } from '@/types/database';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import SimpleContentDisplay from '@/components/SimpleContentDisplay';

export default function HistoiresPage() {
  const [histoires, setHistoires] = useState<Histoire[]>([]);
  const [filteredHistoires, setFilteredHistoires] = useState<Histoire[]>([]);
  const [loading, setLoading] = useState(true);
  const [villeName, setVilleName] = useState<string>('');
  const searchParams = useSearchParams();
  const villeId = searchParams.get('ville');

  useEffect(() => {
    async function loadHistoires() {
      try {
        setLoading(true);
        const data = await SupabaseService.getHistoires();
        setHistoires(data);
      } catch (error) {
        console.error('Erreur lors du chargement des histoires:', error);
        setHistoires([]);
      } finally {
        setLoading(false);
      }
    }
    loadHistoires();
  }, []);

  useEffect(() => {
    if (!histoires.length) return;

    if (villeId) {
      const filtered = histoires.filter(histoire => 
        histoire.ville_id === parseInt(villeId)
      );
      setFilteredHistoires(filtered);
      
      // Récupérer le nom de la ville pour l'affichage
      if (filtered.length > 0 && filtered[0].ville) {
        setVilleName(filtered[0].ville.nom);
      }
    } else {
      setFilteredHistoires(histoires);
      setVilleName('');
    }
  }, [histoires, villeId]);

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Header de la page */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl font-playfair">
            {villeName ? `Histoires de ${villeName}` : 'Histoires de Provence'}
          </h1>
          <p className="mt-6 text-lg leading-8 text-amber-700">
            {villeName 
              ? `Découvrez les récits fascinants de ${villeName} et son patrimoine historique unique.`
              : 'Plongez dans les récits fascinants qui ont façonné l\'identité provençale à travers les siècles.'
            }
          </p>
          {villeName && (
            <div className="mt-4">
              <Link
                href="/histoires"
                className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-orange-600"
              >
                ← Voir toutes les histoires de Provence
              </Link>
            </div>
          )}
        </div>

        {/* Liste des histoires */}
        {loading ? (
          <div className="mt-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <p className="mt-2 text-amber-600">Chargement des histoires...</p>
          </div>
        ) : filteredHistoires.length > 0 ? (
          <div className="mt-16 space-y-8">
            {filteredHistoires.map((histoire) => (
              <article key={histoire.id} className="bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-2">
                        {histoire.titre}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-amber-600">
                        {histoire.ville && (
                          <Link 
                            href={`/villes/${histoire.ville.id}`}
                            className="flex items-center hover:text-orange-600 transition-colors"
                          >
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {histoire.ville.nom}
                          </Link>
                        )}
                        {histoire.periode && (
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {histoire.periode}
                          </div>
                        )}
                      </div>
                    </div>
                    {histoire.periode && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                        {histoire.periode}
                      </span>
                    )}
                  </div>
                  
                  <SimpleContentDisplay 
                    content={histoire.contenu}
                    className="text-amber-800"
                  />
                  
                  {histoire.ville && (
                    <div className="mt-6 pt-6 border-t border-amber-100">
                      <Link
                        href={`/villes/${histoire.ville.id}`}
                        className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-orange-600 transition-colors"
                      >
                        Découvrir {histoire.ville.nom} →
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-md">
              <span className="text-6xl mb-4 block">📚</span>
              <h3 className="text-lg font-semibold text-amber-900">Aucune histoire trouvée</h3>
              <p className="mt-2 text-amber-600">
                Les histoires seront bientôt disponibles. En attendant, vous pouvez explorer les villes et monuments.
              </p>
              <div className="mt-6">
                <Link
                  href="/villes"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
                >
                  Explorer les villes
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques */}
        {histoires.length > 0 && (
          <div className="mt-24 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-8">
                Patrimoine Historique
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div>
                  <div className="text-3xl font-bold text-amber-600">{histoires.length}</div>
                  <div className="text-sm text-amber-700">Histoires référencées</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">
                    {new Set(histoires.filter(h => h.ville).map(h => h.ville!.id)).size}
                  </div>
                  <div className="text-sm text-amber-700">Villes avec histoires</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">
                    {new Set(histoires.map(h => h.periode).filter(Boolean)).size}
                  </div>
                  <div className="text-sm text-amber-700">Périodes historiques</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
