import { SupabaseService } from '@/lib/supabaseService';
import VilleCard from '@/components/VilleCard';
import { Ville } from '@/types/database';
import Link from 'next/link';

export default async function VillesPage() {
  let villes: Ville[] = [];
  try {
    villes = await SupabaseService.getVilles();
  } catch (error) {
    console.error('Erreur lors du chargement des villes:', error);
    villes = [];
  }

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Header de la page */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl font-playfair">
            Villes de Provence
          </h1>
          <p className="mt-6 text-lg leading-8 text-amber-700">
            Découvrez les villes authentiques de Provence, chacune avec son histoire unique, 
            ses monuments remarquables et ses traditions séculaires.
          </p>
        </div>

        {/* Navigation et actions */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/carte"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Voir sur la carte
          </Link>
          <div className="text-center text-sm text-amber-600">
            {villes.length} ville{villes.length > 1 ? 's' : ''} de Provence
          </div>
        </div>

        {/* Filtres par département */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <Link
            href="/villes"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
          >
            Toutes les villes
          </Link>
          <Link
            href="/villes?dept=13"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-amber-700 border border-amber-300 hover:bg-amber-50 transition-colors"
          >
            Bouches-du-Rhône (13)
          </Link>
          <Link
            href="/villes?dept=83"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-amber-700 border border-amber-300 hover:bg-amber-50 transition-colors"
          >
            Var (83)
          </Link>
          <Link
            href="/villes?dept=84"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-amber-700 border border-amber-300 hover:bg-amber-50 transition-colors"
          >
            Vaucluse (84)
          </Link>
          <Link
            href="/villes?dept=04"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-amber-700 border border-amber-300 hover:bg-amber-50 transition-colors"
          >
            Alpes-de-Haute-Provence (04)
          </Link>
        </div>

        {/* Grille des villes */}
        {villes.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {villes.map((ville) => (
              <VilleCard key={ville.id} ville={ville} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-md">
              <span className="text-6xl mb-4 block">🏛️</span>
              <h3 className="text-lg font-semibold text-amber-900">Aucune ville trouvée</h3>
              <p className="mt-2 text-amber-600">
                Les données des villes seront bientôt disponibles. En attendant, vous pouvez explorer les autres sections.
              </p>
            </div>
          </div>
        )}

        {/* Statistiques */}
        {villes.length > 0 && (
          <div className="mt-24 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-amber-900 font-playfair">
                Patrimoine Provençal
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div>
                  <div className="text-3xl font-bold text-amber-600">{villes.length}</div>
                  <div className="text-sm text-amber-700">Villes référencées</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">
                    {villes.reduce((sum, ville) => sum + (ville.population || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-amber-700">Habitants au total</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">4</div>
                  <div className="text-sm text-amber-700">Départements</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
