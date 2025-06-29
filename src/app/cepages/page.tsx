import React from 'react';
import Link from 'next/link';

export default function CepagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              🍇 Cépages de Provence
            </h1>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Explorez les variétés de raisin qui donnent naissance aux vins de Provence, 
              des cépages traditionnels méditerranéens aux variétés autochtones rares.
            </p>
          </div>

          {/* Cépages par couleur */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Cépages Rouges */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🍇</span>
                Cépages Rouges
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-bold text-red-700">Mourvèdre</h3>
                  <p className="text-sm text-gray-600">Cépage roi de Bandol, structure et élégance</p>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <h3 className="font-bold text-red-700">Grenache Noir</h3>
                  <p className="text-sm text-gray-600">Généreux et fruité, base des rosés</p>
                </div>
                <div className="border-l-4 border-red-300 pl-4">
                  <h3 className="font-bold text-red-700">Syrah</h3>
                  <p className="text-sm text-gray-600">Épice et couleur, venu du Rhône</p>
                </div>
                <div className="border-l-4 border-red-200 pl-4">
                  <h3 className="font-bold text-red-700">Cinsault</h3>
                  <p className="text-sm text-gray-600">Finesse aromatique, parfait pour les rosés</p>
                </div>
              </div>
            </div>

            {/* Cépages Blancs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🥂</span>
                Cépages Blancs
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-bold text-yellow-700">Marsanne</h3>
                  <p className="text-sm text-gray-600">Richesse et ampleur, star de Cassis</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h3 className="font-bold text-yellow-700">Clairette</h3>
                  <p className="text-sm text-gray-600">Fraîcheur et vivacité méditerranéenne</p>
                </div>
                <div className="border-l-4 border-yellow-300 pl-4">
                  <h3 className="font-bold text-yellow-700">Rolle (Vermentino)</h3>
                  <p className="text-sm text-gray-600">Minéralité et notes marines</p>
                </div>
                <div className="border-l-4 border-yellow-200 pl-4">
                  <h3 className="font-bold text-yellow-700">Bourboulenc</h3>
                  <p className="text-sm text-gray-600">Acidité et longévité exceptionnelles</p>
                </div>
              </div>
            </div>

            {/* Cépages Autochtones */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🌿</span>
                Cépages Rares
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-bold text-purple-700">Folle Noire</h3>
                  <p className="text-sm text-gray-600">Rarissime cépage niçois de Bellet</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h3 className="font-bold text-purple-700">Braquet</h3>
                  <p className="text-sm text-gray-600">Autochtone de Nice, délicat et rare</p>
                </div>
                <div className="border-l-4 border-purple-300 pl-4">
                  <h3 className="font-bold text-purple-700">Furmint</h3>
                  <p className="text-sm text-gray-600">Originalité hongroise à Palette</p>
                </div>
                <div className="border-l-4 border-purple-200 pl-4">
                  <h3 className="font-bold text-purple-700">Tibouren</h3>
                  <p className="text-sm text-gray-600">Ancien cépage provençal oublié</p>
                </div>
              </div>
            </div>
          </div>

          {/* Détail des cépages principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mourvèdre */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-red-200 to-red-500 flex items-center justify-center">
                <span className="text-6xl">👑</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Mourvèdre</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Le cépage roi de Bandol, apportant structure tannique et potentiel de garde exceptionnel.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Origine:</span>
                    <span className="text-amber-900 font-semibold">Espagne</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellations:</span>
                    <span className="text-amber-900 font-semibold">Bandol, Palette</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Caractère:</span>
                    <span className="text-amber-900 font-semibold">Tannique, Épicé</span>
                  </div>
                </div>
                <Link href="/cepages/mourvedre" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  En savoir plus →
                </Link>
              </div>
            </div>

            {/* Grenache */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-rose-200 to-pink-400 flex items-center justify-center">
                <span className="text-6xl">🌹</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Grenache Noir</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Cépage généreux et fruité, pilier des rosés de Provence et des assemblages rouges.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Origine:</span>
                    <span className="text-amber-900 font-semibold">Espagne/Sardaigne</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellations:</span>
                    <span className="text-amber-900 font-semibold">Toutes AOC Provence</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Caractère:</span>
                    <span className="text-amber-900 font-semibold">Fruité, Généreux</span>
                  </div>
                </div>
                <Link href="/cepages/grenache" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  En savoir plus →
                </Link>
              </div>
            </div>

            {/* Rolle */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                <span className="text-6xl">🌊</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Rolle (Vermentino)</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Cépage blanc méditerranéen apportant fraîcheur marine et minéralité aux vins côtiers.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Origine:</span>
                    <span className="text-amber-900 font-semibold">Italie/Corse</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellations:</span>
                    <span className="text-amber-900 font-semibold">Cassis, Bellet</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Caractère:</span>
                    <span className="text-amber-900 font-semibold">Minéral, Iodé</span>
                  </div>
                </div>
                <Link href="/cepages/rolle" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  En savoir plus →
                </Link>
              </div>
            </div>

            {/* Cinsault */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center">
                <span className="text-6xl">🧡</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Cinsault</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Cépage délicat apportant finesse aromatique et couleur tendre aux rosés provençaux.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Origine:</span>
                    <span className="text-amber-900 font-semibold">Provence</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellations:</span>
                    <span className="text-amber-900 font-semibold">Côtes de Provence</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Caractère:</span>
                    <span className="text-amber-900 font-semibold">Délicat, Aromatique</span>
                  </div>
                </div>
                <Link href="/cepages/cinsault" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  En savoir plus →
                </Link>
              </div>
            </div>

            {/* Syrah */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-200 to-purple-500 flex items-center justify-center">
                <span className="text-6xl">🌶️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Syrah</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Cépage du Rhône apportant couleur intense, épices et notes poivrées aux assemblages.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Origine:</span>
                    <span className="text-amber-900 font-semibold">Vallée du Rhône</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellations:</span>
                    <span className="text-amber-900 font-semibold">Les Baux, Côtes de Provence</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Caractère:</span>
                    <span className="text-amber-900 font-semibold">Épicé, Coloré</span>
                  </div>
                </div>
                <Link href="/cepages/syrah" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  En savoir plus →
                </Link>
              </div>
            </div>

            {/* Marsanne */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-yellow-200 to-amber-300 flex items-center justify-center">
                <span className="text-6xl">☀️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Marsanne</h3>
                <p className="text-amber-700 mb-4 text-sm">
                  Cépage blanc noble du Rhône, apportant richesse et ampleur aux vins blancs de Cassis.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Origine:</span>
                    <span className="text-amber-900 font-semibold">Vallée du Rhône</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Appellations:</span>
                    <span className="text-amber-900 font-semibold">Cassis</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Caractère:</span>
                    <span className="text-amber-900 font-semibold">Riche, Ample</span>
                  </div>
                </div>
                <Link href="/cepages/marsanne" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                  En savoir plus →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Navigation dans l&apos;univers du vin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/appellations" className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                <h3 className="font-bold text-amber-900 mb-2">Appellations</h3>
                <p className="text-sm text-amber-700">Cépages autorisés par appellation</p>
              </Link>
              <Link href="/domaines" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <h3 className="font-bold text-orange-900 mb-2">Domaines</h3>
                <p className="text-sm text-orange-700">Spécialités et encépagement des domaines</p>
              </Link>
              <Link href="/vins" className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <h3 className="font-bold text-red-900 mb-2">Vins</h3>
                <p className="text-sm text-red-700">Assemblages et cépages des cuvées</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
