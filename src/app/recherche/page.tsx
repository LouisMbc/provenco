import { SupabaseService } from '@/lib/supabaseService';
import { Ville, Histoire, Legende, Monument } from '@/types/database';
import Link from 'next/link';
import { MagnifyingGlassIcon, MapPinIcon, BookOpenIcon, SparklesIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import SimpleContentDisplay from '@/components/SimpleContentDisplay';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

interface SearchResults {
  villes: Ville[];
  histoires: Histoire[];
  legendes: Legende[];
  monuments: Monument[];
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;
  
  if (!query || query.trim() === '') {
    return (
      <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <MagnifyingGlassIcon className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-amber-900 mb-4">Recherche</h1>
            <p className="text-amber-700">Saisissez un terme de recherche pour explorer le contenu du site.</p>
          </div>
        </div>
      </div>
    );
  }

  const results: SearchResults = {
    villes: [],
    histoires: [],
    legendes: [],
    monuments: []
  };

  try {
    // Recherche dans les villes
    const villes = await SupabaseService.getVilles();
    results.villes = villes.filter(ville => 
      ville.nom.toLowerCase().includes(query.toLowerCase()) ||
      ville.departement?.toLowerCase().includes(query.toLowerCase())
    );

    // Recherche dans les histoires
    const histoires = await SupabaseService.getHistoires();
    results.histoires = histoires.filter(histoire => 
      histoire.titre.toLowerCase().includes(query.toLowerCase()) ||
      histoire.contenu.toLowerCase().includes(query.toLowerCase()) ||
      histoire.periode?.toLowerCase().includes(query.toLowerCase())
    );

    // Recherche dans les légendes
    const legendes = await SupabaseService.getLegendes();
    results.legendes = legendes.filter(legende => 
      legende.titre.toLowerCase().includes(query.toLowerCase()) ||
      legende.contenu.toLowerCase().includes(query.toLowerCase()) ||
      legende.origine?.toLowerCase().includes(query.toLowerCase())
    );

    // Recherche dans les monuments
    const monuments = await SupabaseService.getMonuments();
    results.monuments = monuments.filter(monument => 
      monument.nom.toLowerCase().includes(query.toLowerCase()) ||
      monument.description?.toLowerCase().includes(query.toLowerCase()) ||
      monument.type?.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
  }

  const totalResults = results.villes.length + results.histoires.length + results.legendes.length + results.monuments.length;

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Header de recherche */}
        <div className="text-center mb-12">
          <MagnifyingGlassIcon className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-amber-900 mb-4 font-playfair">
            Résultats de recherche
          </h1>
          <p className="text-lg text-amber-700">
            <span className="font-semibold">{totalResults}</span> résultat{totalResults !== 1 ? 's' : ''} trouvé{totalResults !== 1 ? 's' : ''} pour &quot;<span className="font-semibold">{query}</span>&quot;
          </p>
        </div>

        {totalResults === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-amber-700 mb-6">
              Aucun contenu ne correspond à votre recherche. Essayez avec d&apos;autres mots-clés.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Villes */}
            {results.villes.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-amber-900 mb-6 font-playfair flex items-center">
                  <MapPinIcon className="h-6 w-6 mr-3 text-amber-600" />
                  Villes ({results.villes.length})
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.villes.map((ville) => (
                    <Link
                      key={ville.id}
                      href={`/villes/${ville.id}`}
                      className="group bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-amber-900 group-hover:text-orange-600 transition-colors mb-2">
                          {ville.nom}
                        </h3>
                        {ville.departement && (
                          <p className="text-amber-600 text-sm mb-3">{ville.departement}</p>
                        )}
                        {ville.population && (
                          <p className="text-amber-700 text-sm">
                            {ville.population.toLocaleString()} habitants
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Histoires */}
            {results.histoires.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-amber-900 mb-6 font-playfair flex items-center">
                  <BookOpenIcon className="h-6 w-6 mr-3 text-amber-600" />
                  Histoires ({results.histoires.length})
                </h2>
                <div className="space-y-6">
                  {results.histoires.map((histoire) => (
                    <div
                      key={histoire.id}
                      className="bg-white rounded-xl shadow-md border border-amber-200 p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-amber-900">{histoire.titre}</h3>
                        {histoire.periode && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                            {histoire.periode}
                          </span>
                        )}
                      </div>
                      <div className="text-amber-700 text-sm leading-relaxed line-clamp-3">
                        <SimpleContentDisplay content={histoire.contenu} />
                      </div>
                      {histoire.ville && (
                        <div className="mt-4 pt-4 border-t border-amber-200">
                          <Link
                            href={`/villes/${histoire.ville.id}`}
                            className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-orange-600 transition-colors"
                          >
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {histoire.ville.nom}
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Légendes */}
            {results.legendes.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-amber-900 mb-6 font-playfair flex items-center">
                  <SparklesIcon className="h-6 w-6 mr-3 text-amber-600" />
                  Légendes ({results.legendes.length})
                </h2>
                <div className="space-y-6">
                  {results.legendes.map((legende) => (
                    <div
                      key={legende.id}
                      className="bg-white rounded-xl shadow-md border border-amber-200 p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-amber-900">{legende.titre}</h3>
                        {legende.origine && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                            {legende.origine}
                          </span>
                        )}
                      </div>
                      <div className="text-amber-700 text-sm leading-relaxed line-clamp-3">
                        <SimpleContentDisplay content={legende.contenu} />
                      </div>
                      {legende.ville && (
                        <div className="mt-4 pt-4 border-t border-amber-200">
                          <Link
                            href={`/villes/${legende.ville.id}`}
                            className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-orange-600 transition-colors"
                          >
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {legende.ville.nom}
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Monuments */}
            {results.monuments.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-amber-900 mb-6 font-playfair flex items-center">
                  <BuildingLibraryIcon className="h-6 w-6 mr-3 text-amber-600" />
                  Monuments ({results.monuments.length})
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.monuments.map((monument) => (
                    <div
                      key={monument.id}
                      className="bg-white rounded-xl shadow-md border border-amber-200 p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-amber-900">{monument.nom}</h3>
                        {monument.type && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                            {monument.type}
                          </span>
                        )}
                      </div>
                      {monument.description && (
                        <div className="text-amber-700 text-sm leading-relaxed line-clamp-3 mb-3">
                          <SimpleContentDisplay content={monument.description} />
                        </div>
                      )}
                      {monument.ville && (
                        <Link
                          href={`/villes/${monument.ville.id}`}
                          className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-orange-600 transition-colors"
                        >
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {monument.ville.nom}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Navigation de retour */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
