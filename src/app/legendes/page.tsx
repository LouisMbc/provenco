import { SupabaseService } from '@/lib/supabaseService';
import { Legende } from '@/types/database';
import { SparklesIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function LegendesPage() {
  let legendes: Legende[] = [];
  try {
    legendes = await SupabaseService.getLegendes();
  } catch (error) {
    console.error('Erreur lors du chargement des légendes:', error);
    legendes = [];
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 via-amber-50 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Header de la page */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl font-playfair">
            Légendes de Provence
          </h1>
          <p className="mt-6 text-lg leading-8 text-amber-700">
            Découvrez les contes et légendes qui donnent à la Provence son charme mystique. 
            Ces récits transmis de génération en génération révèlent l&apos;âme profonde de cette terre magique.
          </p>
        </div>

        {/* Liste des légendes */}
        {legendes.length > 0 ? (
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {legendes.map((legende) => (
              <article key={legende.id} className="group relative bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <SparklesIcon className="h-6 w-6 text-purple-400 group-hover:text-purple-500 transition-colors" />
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-3 pr-10">
                      {legende.titre}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-amber-600">
                      {legende.ville && (
                        <Link 
                          href={`/villes/${legende.ville.id}`}
                          className="flex items-center hover:text-orange-600 transition-colors"
                        >
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {legende.ville.nom}
                        </Link>
                      )}
                      {legende.origine && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {legende.origine}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="prose prose-amber max-w-none">
                    <p className="text-amber-800 leading-relaxed">
                      {legende.contenu}
                    </p>
                  </div>
                  
                  {legende.ville && (
                    <div className="mt-6 pt-6 border-t border-amber-100">
                      <Link
                        href={`/villes/${legende.ville.id}`}
                        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        Explorer {legende.ville.nom} →
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
              <span className="text-6xl mb-4 block">✨</span>
              <h3 className="text-lg font-semibold text-amber-900">Aucune légende trouvée</h3>
              <p className="mt-2 text-amber-600">
                Les légendes seront bientôt disponibles. En attendant, vous pouvez découvrir les histoires et monuments.
              </p>
              <div className="mt-6">
                <Link
                  href="/histoires"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 transition-all duration-200"
                >
                  Lire les histoires
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Section mystique */}
        {legendes.length > 0 && (
          <div className="mt-24">
            <div className="bg-gradient-to-r from-purple-100 via-amber-100 to-orange-100 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <SparklesIcon className="w-full h-full text-purple-600" />
              </div>
              
              <div className="text-center relative">
                <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-8">
                  Patrimoine Légendaire
                </h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{legendes.length}</div>
                    <div className="text-sm text-amber-700">Légendes collectées</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      {new Set(legendes.filter(l => l.ville).map(l => l.ville!.id)).size}
                    </div>
                    <div className="text-sm text-amber-700">Villes mystiques</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      {new Set(legendes.map(l => l.origine).filter(Boolean)).size}
                    </div>
                    <div className="text-sm text-amber-700">Origines différentes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Citation inspirante */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl italic text-amber-700 font-playfair max-w-3xl mx-auto">
            &ldquo;En Provence, chaque pierre a sa légende, chaque fontaine son mystère, 
            et chaque village son conte merveilleux transmis par les anciens.&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
}
