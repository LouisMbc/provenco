'use client';

export default function VinFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Nouveau Vin</h1>
            <p className="mt-2 text-gray-600">Créer une nouvelle cuvée</p>
          </div>

          <form className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du vin / Cuvée
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: Cuvée Prestige"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Domaine
                  </label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Sélectionner un domaine</option>
                    <option value="1">Château de...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type de vin
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
                    Millésime
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 2 023"
                  />
                  <p className="mt-1 text-xs text-gray-500">Les espaces sont autorisés</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Caractéristiques techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Degré d&apos;alcool
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 13,5"
                  />
                  <p className="mt-1 text-xs text-gray-500">Utilisez la virgule comme séparateur décimal</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Production (bouteilles)
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 15 000"
                  />
                  <p className="mt-1 text-xs text-gray-500">Les espaces sont autorisés</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prix approximatif (€)
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 25,50"
                  />
                  <p className="mt-1 text-xs text-gray-500">Utilisez la virgule comme séparateur décimal</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Assemblage</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Définissez la composition en cépages de cette cuvée.
                </p>
                <div className="flex items-center space-x-4">
                  <button type="button" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    + Ajouter un cépage
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Les cépages seront ajoutés dynamiquement depuis la base de données une fois l&apos;interface connectée.
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Dégustation et notes</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes de dégustation
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Arômes, saveurs, structure, longueur en bouche..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Accords mets et vins
                  </label>
                  <textarea
                    rows={2}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Suggestions d'accords culinaires..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Température de service
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 12-14°C"
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
                Créer le vin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
