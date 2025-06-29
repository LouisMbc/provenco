import React from 'react';
import Link from 'next/link';

export default function AppellationsPage() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Côtes de Provence */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-rose-200 to-pink-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Côtes de Provence</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  La plus vaste appellation de Provence, célèbre pour ses rosés exceptionnels et ses rouges de caractère.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">75% Rosé</span>
                  <Link href="/appellations/cotes-de-provence" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    Découvrir →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bandol */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-red-200 to-red-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Bandol</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Appellation prestigieuse connue pour ses vins rouges puissants à base de Mourvèdre et ses rosés élégants.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Rouge Premium</span>
                  <Link href="/appellations/bandol" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    Découvrir →
                  </Link>
                </div>
              </div>
            </div>

            {/* Cassis */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-yellow-200 to-amber-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Cassis</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Petite appellation côtière réputée pour ses vins blancs minéraux et ses rosés frais.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Blanc Minéral</span>
                  <Link href="/appellations/cassis" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    Découvrir →
                  </Link>
                </div>
              </div>
            </div>

            {/* Palette */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-200 to-purple-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Palette</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  La plus petite appellation de Provence, produisant des vins rares et recherchés près d&apos;Aix-en-Provence.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Rare & Unique</span>
                  <Link href="/appellations/palette" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    Découvrir →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bellet */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Bellet</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Appellation niçoise alpine produisant des vins d&apos;altitude avec des cépages autochtones uniques.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Altitude</span>
                  <Link href="/appellations/bellet" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    Découvrir →
                  </Link>
                </div>
              </div>
            </div>

            {/* Les Baux-de-Provence */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Les Baux-de-Provence</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Appellation des Alpilles connue pour ses vins biologiques et ses terroirs calcaires exceptionnels.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Bio</span>
                  <Link href="/appellations/les-baux-de-provence" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    Découvrir →
                  </Link>
                </div>
              </div>
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
