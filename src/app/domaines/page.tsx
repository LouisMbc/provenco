import React from 'react';
import Link from 'next/link';

export default function DomainesPage() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Domaine Tempier */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-red-200 to-red-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Domaine Tempier</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Domaine mythique de Bandol, pionnier du Mourvèdre et référence absolue des vins de Provence.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellation:</span>
                    <span className="text-amber-900 font-semibold">Bandol</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Spécialité:</span>
                    <span className="text-amber-900 font-semibold">Rouge, Rosé</span>
                  </div>
                </div>
                <Link href="/domaines/tempier" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir le domaine →
                </Link>
              </div>
            </div>

            {/* Château Minuty */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-rose-200 to-pink-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Château Minuty</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Domaine familial emblématique de Saint-Tropez, maître incontesté du rosé de Provence.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellation:</span>
                    <span className="text-amber-900 font-semibold">Côtes de Provence</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Spécialité:</span>
                    <span className="text-amber-900 font-semibold">Rosé Premium</span>
                  </div>
                </div>
                <Link href="/domaines/minuty" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir le domaine →
                </Link>
              </div>
            </div>

            {/* Domaine de la Rectorie */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-yellow-200 to-amber-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Domaine de la Rectorie</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Domaine artisanal produisant des vins de caractère sur les terroirs escarpés de Banyuls.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellation:</span>
                    <span className="text-amber-900 font-semibold">Banyuls</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Spécialité:</span>
                    <span className="text-amber-900 font-semibold">Vins Doux Naturels</span>
                  </div>
                </div>
                <Link href="/domaines/rectorie" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir le domaine →
                </Link>
              </div>
            </div>

            {/* Château Simone */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-200 to-purple-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Château Simone</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Unique domaine de l&apos;appellation Palette, produisant des vins rares depuis 1830.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellation:</span>
                    <span className="text-amber-900 font-semibold">Palette</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Spécialité:</span>
                    <span className="text-amber-900 font-semibold">Rouge, Blanc, Rosé</span>
                  </div>
                </div>
                <Link href="/domaines/simone" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir le domaine →
                </Link>
              </div>
            </div>

            {/* Domaine de Trévallon */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Domaine de Trévallon</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Domaine iconique des Alpilles, pionnier de la biodynamie et des assemblages originaux.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellation:</span>
                    <span className="text-amber-900 font-semibold">Les Baux-de-Provence</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Spécialité:</span>
                    <span className="text-amber-900 font-semibold">Rouge Bio</span>
                  </div>
                </div>
                <Link href="/domaines/trevallon" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir le domaine →
                </Link>
              </div>
            </div>

            {/* Clos Sainte Magdeleine */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Clos Sainte Magdeleine</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Domaine face à la mer à Cassis, spécialisé dans les vins blancs minéraux exceptionnels.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellation:</span>
                    <span className="text-amber-900 font-semibold">Cassis</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Spécialité:</span>
                    <span className="text-amber-900 font-semibold">Blanc Minéral</span>
                  </div>
                </div>
                <Link href="/domaines/sainte-magdeleine" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  Découvrir le domaine →
                </Link>
              </div>
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
