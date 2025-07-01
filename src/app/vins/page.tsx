'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SupabaseService } from '@/lib/supabaseService';
import SimpleContentDisplay from '@/components/SimpleContentDisplay';
import { Vin } from '@/types/database';

export default function VinsPage() {
  const [vins, setVins] = useState<Vin[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    async function loadVins() {
      try {
        setLoading(true);
        const data = await SupabaseService.getVins();
        setVins(data);
      } catch (error) {
        console.error('Erreur lors du chargement des vins:', error);
        setVins([]);
      } finally {
        setLoading(false);
      }
    }
    loadVins();
  }, []);

  const filteredVins = selectedType
    ? vins.filter(vin => vin.type_vin?.nom.toLowerCase() === selectedType.toLowerCase())
    : vins;

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
            <button 
              onClick={() => setSelectedType('')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedType === '' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              🍷 Tous
            </button>
            <button 
              onClick={() => setSelectedType('rosé')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedType === 'rosé' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
              }`}
            >
              🌹 Rosé
            </button>
            <button 
              onClick={() => setSelectedType('rouge')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedType === 'rouge' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              🍇 Rouge
            </button>
            <button 
              onClick={() => setSelectedType('blanc')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedType === 'blanc' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              🥂 Blanc
            </button>
            <button 
              onClick={() => setSelectedType('doux naturel')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedType === 'doux naturel' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
            >
              🍯 Doux Naturel
            </button>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-amber-500 bg-white transition ease-in-out duration-150">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement des vins...
              </div>
            </div>
          ) : filteredVins.length === 0 ? (
            <div className="text-center mb-12">
              <p className="text-lg text-amber-700">
                {selectedType 
                  ? `Aucun vin ${selectedType} n'est encore enregistré.`
                  : "Aucun vin n'est encore enregistré. Utilisez l'administration pour ajouter du contenu."
                }
              </p>
              
              {/* Actions de navigation */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/admin/vins"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Gérer les vins
                </Link>
                <Link
                  href="/domaines"
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voir les domaines
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredVins.map((vin) => (
                <div key={vin.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {vin.image_url && (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={vin.image_url}
                        alt={vin.nom}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{vin.nom}</h3>
                      {vin.annee && (
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                          {vin.annee}
                        </span>
                      )}
                    </div>
                    <div className="mb-2 text-sm text-gray-600">
                      {vin.domaine && <p><strong>Domaine:</strong> {vin.domaine.nom}</p>}
                      {vin.appellation && <p><strong>Appellation:</strong> {vin.appellation.nom}</p>}
                      {vin.type_vin && <p><strong>Type:</strong> {vin.type_vin.nom}</p>}
                      {vin.prix && <p><strong>Prix:</strong> {vin.prix}€</p>}
                    </div>
                    {vin.description && (
                      <div className="text-gray-600">
                        <SimpleContentDisplay content={vin.description} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mb-12">
            {/* Actions de navigation */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/admin/vins"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Gérer les vins
              </Link>
              <Link
                href="/domaines"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voir les domaines
              </Link>
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
