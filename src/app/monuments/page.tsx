import { SupabaseService } from '@/lib/supabaseService';
import { Monument } from '@/types/database';
import { BuildingLibraryIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function MonumentsPage() {
  let monuments: Monument[] = [];
  try {
    monuments = await SupabaseService.getMonuments();
  } catch (error) {
    console.error('Erreur lors du chargement des monuments:', error);
    monuments = [];
  }

  // Grouper les monuments par type
  const monumentsByType = monuments.reduce((acc, monument) => {
    const type = monument.type || 'Autre';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(monument);
    return acc;
  }, {} as Record<string, Monument[]>);

  const types = Object.keys(monumentsByType).sort();

  return (
    <div className="bg-gradient-to-b from-stone-50 via-amber-50 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Header de la page */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl font-playfair">
            Monuments de Provence
          </h1>
          <p className="mt-6 text-lg leading-8 text-amber-700">
            Admirez les châteaux, églises, fontaines et monuments qui témoignent du génie architectural provençal. 
            Chaque pierre raconte l&apos;histoire de cette région aux mille visages.
          </p>
        </div>

        {/* Filtres par type */}
        {types.length > 1 && (
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Link
              href="/monuments"
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
            >
              Tous les monuments
            </Link>
            {types.map((type) => (
              <Link
                key={type}
                href={`/monuments?type=${encodeURIComponent(type)}`}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-amber-700 border border-amber-300 hover:bg-amber-50 transition-colors"
              >
                {type} ({monumentsByType[type].length})
              </Link>
            ))}
          </div>
        )}

        {/* Liste des monuments */}
        {monuments.length > 0 ? (
          <div className="mt-16">
            {types.map((type) => (
              <div key={type} className="mb-16">
                <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-8 flex items-center">
                  <BuildingLibraryIcon className="h-6 w-6 mr-3 text-amber-600" />
                  {type}
                  <span className="ml-2 text-sm font-normal text-amber-600">
                    ({monumentsByType[type].length})
                  </span>
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {monumentsByType[type].map((monument) => (
                    <article key={monument.id} className="group bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-stone-100 via-amber-100 to-amber-200">
                        <div className="flex items-center justify-center">
                          <BuildingLibraryIcon className="h-12 w-12 text-amber-400 group-hover:text-amber-500 transition-colors" />
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-3">
                          <h3 className="text-xl font-bold text-amber-900 group-hover:text-orange-600 transition-colors">
                            {monument.nom}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-amber-600 mt-2">
                            {monument.ville && (
                              <Link 
                                href={`/villes/${monument.ville.id}`}
                                className="flex items-center hover:text-orange-600 transition-colors"
                              >
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                {monument.ville.nom}
                              </Link>
                            )}
                            {monument.date_construction && (
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {monument.date_construction}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {monument.description && (
                          <p className="text-amber-800 text-sm leading-relaxed line-clamp-3">
                            {monument.description}
                          </p>
                        )}
                        
                        {monument.ville && (
                          <div className="mt-4 pt-4 border-t border-amber-100">
                            <Link
                              href={`/villes/${monument.ville.id}`}
                              className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-orange-600 transition-colors"
                            >
                              Découvrir {monument.ville.nom} →
                            </Link>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-md">
              <span className="text-6xl mb-4 block">🏰</span>
              <h3 className="text-lg font-semibold text-amber-900">Aucun monument trouvé</h3>
              <p className="mt-2 text-amber-600">
                Les monuments seront bientôt référencés. En attendant, découvrez les villes et leurs histoires.
              </p>
              <div className="mt-6">
                <Link
                  href="/villes"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-stone-600 to-amber-600 hover:from-stone-700 hover:to-amber-700 transition-all duration-200"
                >
                  Explorer les villes
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques du patrimoine */}
        {monuments.length > 0 && (
          <div className="mt-24 bg-gradient-to-r from-stone-100 to-amber-100 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-8">
                Patrimoine Architectural
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
                <div>
                  <div className="text-3xl font-bold text-stone-600">{monuments.length}</div>
                  <div className="text-sm text-amber-700">Monuments répertoriés</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stone-600">
                    {new Set(monuments.filter(m => m.ville).map(m => m.ville!.id)).size}
                  </div>
                  <div className="text-sm text-amber-700">Villes avec monuments</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stone-600">{types.length}</div>
                  <div className="text-sm text-amber-700">Types de monuments</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stone-600">
                    {monuments.filter(m => m.date_construction).length}
                  </div>
                  <div className="text-sm text-amber-700">Avec dates de construction</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Types de monuments populaires */}
        {types.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-amber-900 font-playfair text-center mb-8">
              Types de Monuments en Provence
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {types.map((type) => (
                <Link
                  key={type}
                  href={`/monuments?type=${encodeURIComponent(type)}`}
                  className="group text-center p-4 bg-white rounded-lg border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-2xl mb-2">
                    {type.toLowerCase().includes('église') ? '⛪' : 
                     type.toLowerCase().includes('château') ? '🏰' : 
                     type.toLowerCase().includes('fontaine') ? '⛲' : 
                     type.toLowerCase().includes('abbaye') ? '🏛️' : '🏗️'}
                  </div>
                  <div className="text-sm font-medium text-amber-900 group-hover:text-orange-600 transition-colors">
                    {type}
                  </div>
                  <div className="text-xs text-amber-600">
                    {monumentsByType[type].length} monument{monumentsByType[type].length > 1 ? 's' : ''}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
