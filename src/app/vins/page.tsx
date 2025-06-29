import React from 'react';
import Link from 'next/link';

export default function VinsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              🍷 Vins de Provence
            </h1>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Découvrez les cuvées emblématiques de Provence, des rosés rafraîchissants 
              aux rouges de garde, en passant par les blancs minéraux.
            </p>
          </div>

          {/* Filtres par type */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="px-6 py-2 bg-rose-100 text-rose-800 rounded-full font-semibold hover:bg-rose-200 transition-colors">
              🌹 Rosé
            </button>
            <button className="px-6 py-2 bg-red-100 text-red-800 rounded-full font-semibold hover:bg-red-200 transition-colors">
              🍇 Rouge
            </button>
            <button className="px-6 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold hover:bg-yellow-200 transition-colors">
              🥂 Blanc
            </button>
            <button className="px-6 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold hover:bg-purple-200 transition-colors">
              🍯 Doux Naturel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Minuty Rosé et Or */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center">
                <span className="text-6xl">🌹</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Minuty Rosé et Or</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Le rosé de prestige de Château Minuty, symbole de l&apos;art de vivre provençal.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Domaine:</span>
                    <Link href="/domaines/minuty" className="text-orange-600 hover:underline font-semibold">Château Minuty</Link>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Type:</span>
                    <span className="text-rose-600 font-semibold">Rosé</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Cépages:</span>
                    <span className="text-amber-900">Grenache, Cinsault</span>
                  </div>
                </div>
                <Link href="/vins/minuty-rose-et-or" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir ce vin →
                </Link>
              </div>
            </div>

            {/* Tempier Bandol Rouge */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-red-200 to-red-500 flex items-center justify-center">
                <span className="text-6xl">🍇</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Tempier Bandol Rouge</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Vin rouge puissant et élégant, expression pure du terroir de Bandol et du Mourvèdre.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Domaine:</span>
                    <Link href="/domaines/tempier" className="text-orange-600 hover:underline font-semibold">Domaine Tempier</Link>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Type:</span>
                    <span className="text-red-600 font-semibold">Rouge</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Cépages:</span>
                    <span className="text-amber-900">Mourvèdre, Grenache</span>
                  </div>
                </div>
                <Link href="/vins/tempier-bandol-rouge" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir ce vin →
                </Link>
              </div>
            </div>

            {/* Cassis Blanc Sainte Magdeleine */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-yellow-200 to-amber-300 flex items-center justify-center">
                <span className="text-6xl">🥂</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Cassis Blanc</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Vin blanc minéral et iodé, reflet parfait du terroir maritime de Cassis.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Domaine:</span>
                    <Link href="/domaines/sainte-magdeleine" className="text-orange-600 hover:underline font-semibold">Clos Sainte Magdeleine</Link>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Type:</span>
                    <span className="text-yellow-600 font-semibold">Blanc</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Cépages:</span>
                    <span className="text-amber-900">Marsanne, Clairette</span>
                  </div>
                </div>
                <Link href="/vins/cassis-blanc-sainte-magdeleine" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir ce vin →
                </Link>
              </div>
            </div>

            {/* Palette Rouge Simone */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center">
                <span className="text-6xl">👑</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Château Simone Rouge</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Vin rouge rare et complexe de l&apos;appellation Palette, vieilli en foudres centenaires.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Domaine:</span>
                    <Link href="/domaines/simone" className="text-orange-600 hover:underline font-semibold">Château Simone</Link>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Type:</span>
                    <span className="text-red-600 font-semibold">Rouge</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Cépages:</span>
                    <span className="text-amber-900">Mourvèdre, Grenache, Cinsault</span>
                  </div>
                </div>
                <Link href="/vins/chateau-simone-rouge" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir ce vin →
                </Link>
              </div>
            </div>

            {/* Trévallon Rouge */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-red-400 flex items-center justify-center">
                <span className="text-6xl">🌱</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Trévallon Rouge</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Assemblage iconique Cabernet Sauvignon - Syrah, vin culte des Alpilles en biodynamie.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Domaine:</span>
                    <Link href="/domaines/trevallon" className="text-orange-600 hover:underline font-semibold">Domaine de Trévallon</Link>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Type:</span>
                    <span className="text-red-600 font-semibold">Rouge Bio</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Cépages:</span>
                    <span className="text-amber-900">Cabernet Sauvignon, Syrah</span>
                  </div>
                </div>
                <Link href="/vins/trevallon-rouge" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir ce vin →
                </Link>
              </div>
            </div>

            {/* Banyuls Doux Naturel */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-400 flex items-center justify-center">
                <span className="text-6xl">🍯</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Banyuls Rimage</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Vin doux naturel exceptionnel, trésor des terroirs en terrasses de Banyuls.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Domaine:</span>
                    <Link href="/domaines/rectorie" className="text-orange-600 hover:underline font-semibold">Domaine de la Rectorie</Link>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Type:</span>
                    <span className="text-purple-600 font-semibold">Doux Naturel</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Cépages:</span>
                    <span className="text-amber-900">Grenache Noir</span>
                  </div>
                </div>
                <Link href="/vins/banyuls-rimage" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir ce vin →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Structure hiérarchique</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-amber-600">↑</span>
                <Link href="/appellations" className="font-semibold text-amber-600 hover:text-amber-700">
                  Appellation
                </Link>
                <span className="text-amber-700">→</span>
                <Link href="/domaines" className="font-semibold text-orange-600 hover:text-orange-700">
                  Domaine
                </Link>
                <span className="text-amber-700">→</span>
                <span className="font-semibold text-red-600">Vin</span>
              </div>
              <div className="ml-16 space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-red-600">├──</span>
                  <Link href="/cepages" className="font-semibold text-purple-600 hover:text-purple-700">
                    Cépages utilisés
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-red-600">└──</span>
                  <span className="font-semibold text-green-600">Type de vin</span>
                  <span className="text-amber-700">(Rosé, Rouge, Blanc, Doux Naturel)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
