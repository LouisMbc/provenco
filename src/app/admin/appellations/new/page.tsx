import React from 'react';

export default function AppellationFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Nouvelle Appellation</h1>
            <p className="mt-2 text-gray-600">Créer une nouvelle appellation viticole de Provence</p>
          </div>

          <form className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom de l&apos;appellation
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: Côtes de Provence"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type principal
                  </label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Sélectionner un type</option>
                    <option value="rose">Rosé</option>
                    <option value="rouge">Rouge</option>
                    <option value="blanc">Blanc</option>
                    <option value="doux">Doux Naturel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Région
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: Var, Bouches-du-Rhône"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Superficie (hectares)
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 20000"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Description de l'appellation, ses caractéristiques, son terroir..."
                ></textarea>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Cépages autorisés</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Grenache Noir</span>
                  <input type="number" placeholder="%" className="w-20 border-gray-300 rounded" />
                  <span className="text-sm text-gray-500">% maximum</span>
                </div>
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Mourvèdre</span>
                  <input type="number" placeholder="%" className="w-20 border-gray-300 rounded" />
                  <span className="text-sm text-gray-500">% maximum</span>
                </div>
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Cinsault</span>
                  <input type="number" placeholder="%" className="w-20 border-gray-300 rounded" />
                  <span className="text-sm text-gray-500">% maximum</span>
                </div>
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Syrah</span>
                  <input type="number" placeholder="%" className="w-20 border-gray-300 rounded" />
                  <span className="text-sm text-gray-500">% maximum</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Caractéristiques techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rendement maximum (hl/ha)
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 55"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Degré minimum
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 11.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Année de création AOC
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 1977"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Créer l&apos;appellation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
