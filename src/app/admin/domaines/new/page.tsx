'use client';

export default function DomaineFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Nouveau Domaine</h1>
            <p className="mt-2 text-gray-600">Créer un nouveau domaine viticole de Provence</p>
          </div>

          <form className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du domaine
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: Château de..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Appellation principale
                  </label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Sélectionner une appellation</option>
                    <option value="1">Appellation 1</option>
                    <option value="2">Appellation 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Commune
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: Nom de la commune"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Année de création
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 1 856"
                  />
                  <p className="mt-1 text-xs text-gray-500">Les espaces sont autorisés</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Détails du domaine</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Superficie (hectares)
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ex: 45"
                  />
                  <p className="mt-1 text-xs text-gray-500">Les espaces sont autorisés (ex: 1 200)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type de certification
                  </label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Sélectionner un type</option>
                    <option value="bio">Agriculture Biologique</option>
                    <option value="biodynamie">Biodynamie</option>
                    <option value="hve">Haute Valeur Environnementale</option>
                    <option value="conventionnel">Conventionnel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Site web
                  </label>
                  <input
                    type="url"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://www.domaineexemple.fr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="04 94 98 XX XX"
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
                  placeholder="Histoire du domaine, philosophie, terroir, méthodes de vinification..."
                ></textarea>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Cépages cultivés</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Sélectionnez les cépages cultivés par le domaine et leurs superficies.
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
                Créer le domaine
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
