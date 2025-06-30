import { SupabaseService } from '@/lib/supabaseService';
import { VilleWithRelations } from '@/types/database';
import { notFound } from 'next/navigation';
import { MapPinIcon, UsersIcon, ClockIcon, BookOpenIcon, SparklesIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface VilleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VilleDetailPage({ params }: VilleDetailPageProps) {
  const { id } = await params;
  let ville: VilleWithRelations | null = null;
  
  try {
    ville = await SupabaseService.getVilleById(parseInt(id));
  } catch (error) {
    console.error('Erreur lors du chargement de la ville:', error);
    notFound();
  }

  if (!ville) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      {/* Bouton de retour */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            href="/villes"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux villes de Provence
          </Link>
        </div>
      </div>

      {/* Hero de la ville */}
      <div className="relative">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-playfair">
                {ville.nom}
              </h1>
              <div className="mt-6 flex justify-center space-x-8 text-amber-100">
                {ville.departement && (
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{ville.departement}</span>
                  </div>
                )}
                {ville.code_postal && (
                  <div className="flex items-center">
                    <span className="font-mono">{ville.code_postal}</span>
                  </div>
                )}
                {ville.population && (
                  <div className="flex items-center">
                    <UsersIcon className="h-5 w-5 mr-2" />
                    <span>{ville.population.toLocaleString()} habitants</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-md border border-amber-200 text-center">
            <BookOpenIcon className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-900">{ville.histoires?.length || 0}</div>
            <div className="text-sm text-amber-600">Histoires</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border border-amber-200 text-center">
            <SparklesIcon className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-900">{ville.legendes?.length || 0}</div>
            <div className="text-sm text-amber-600">Légendes</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border border-amber-200 text-center">
            <BuildingLibraryIcon className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-900">{ville.monuments?.length || 0}</div>
            <div className="text-sm text-amber-600">Monuments</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border border-amber-200 text-center">
            <div className="text-2xl mb-2">📸</div>
            <div className="text-2xl font-bold text-amber-900">{ville.images?.length || 0}</div>
            <div className="text-sm text-amber-600">Images</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Histoires */}
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-6 font-playfair flex items-center">
              <BookOpenIcon className="h-6 w-6 mr-3 text-amber-600" />
              Histoires
            </h2>
            {ville.histoires && ville.histoires.length > 0 ? (
              <div className="space-y-6">
                {ville.histoires.slice(0, 3).map((histoire) => (
                  <div key={histoire.id} className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-amber-900">{histoire.titre}</h3>
                      {histoire.periode && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {histoire.periode}
                        </span>
                      )}
                    </div>
                    <p className="text-amber-700 text-sm leading-relaxed line-clamp-3">
                      {histoire.contenu}
                    </p>
                  </div>
                ))}
                {ville.histoires.length > 3 && (
                  <Link
                    href={`/histoires?ville=${ville.id}`}
                    className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-orange-600"
                  >
                    Voir toutes les histoires ({ville.histoires.length}) →
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-amber-600">
                <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-amber-400" />
                <p>Aucune histoire disponible pour cette ville.</p>
              </div>
            )}
          </div>

          {/* Légendes */}
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-6 font-playfair flex items-center">
              <SparklesIcon className="h-6 w-6 mr-3 text-amber-600" />
              Légendes
            </h2>
            {ville.legendes && ville.legendes.length > 0 ? (
              <div className="space-y-6">
                {ville.legendes.slice(0, 3).map((legende) => (
                  <div key={legende.id} className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-amber-900">{legende.titre}</h3>
                      {legende.origine && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {legende.origine}
                        </span>
                      )}
                    </div>
                    <p className="text-amber-700 text-sm leading-relaxed line-clamp-3">
                      {legende.contenu}
                    </p>
                  </div>
                ))}
                {ville.legendes.length > 3 && (
                  <Link
                    href={`/legendes?ville=${ville.id}`}
                    className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-orange-600"
                  >
                    Voir toutes les légendes ({ville.legendes.length}) →
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-amber-600">
                <SparklesIcon className="h-12 w-12 mx-auto mb-4 text-amber-400" />
                <p>Aucune légende disponible pour cette ville.</p>
              </div>
            )}
          </div>
        </div>

        {/* Monuments */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 font-playfair flex items-center">
            <BuildingLibraryIcon className="h-6 w-6 mr-3 text-amber-600" />
            Monuments
          </h2>
          {ville.monuments && ville.monuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ville.monuments.map((monument) => (
                <div key={monument.id} className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-amber-900">{monument.nom}</h3>
                    {monument.type && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {monument.type}
                      </span>
                    )}
                  </div>
                  {monument.date_construction && (
                    <p className="text-sm text-amber-600 mb-2">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      Construit en {monument.date_construction}
                    </p>
                  )}
                  {monument.description && (
                    <p className="text-amber-700 text-sm leading-relaxed">
                      {monument.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-amber-600">
              <BuildingLibraryIcon className="h-12 w-12 mx-auto mb-4 text-amber-400" />
              <p>Aucun monument référencé pour cette ville.</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-16 text-center">
          <Link
            href="/villes"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
          >
            ← Retour aux villes
          </Link>
        </div>
      </div>
    </div>
  );
}
