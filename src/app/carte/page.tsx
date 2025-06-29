'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SupabaseService } from '@/lib/supabaseService';
import { Ville } from '@/types/database';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const DynamicMap = dynamic(() => import('../../components/ProvencoMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        <p className="mt-2 text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  )
}) as React.ComponentType<{ villes: Ville[] }>;

export default function CartePage() {
  const [villes, setVilles] = useState<Ville[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVilles, setFilteredVilles] = useState<Ville[]>([]);

  useEffect(() => {
    loadVilles();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredVilles(villes);
    } else {
      const filtered = villes.filter(ville =>
        ville.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ville.region?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVilles(filtered);
    }
  }, [searchTerm, villes]);

  const loadVilles = async () => {
    try {
      const data = await SupabaseService.getVilles();
      // Filtrer les villes qui ont des coordonnées
      const villesAvecCoordonnees = data.filter(ville => 
        ville.latitude !== null && ville.longitude !== null
      );
      setVilles(villesAvecCoordonnees);
      setFilteredVilles(villesAvecCoordonnees);
    } catch (error) {
      console.error('Erreur lors du chargement des villes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-amber-700 font-medium">Chargement des villes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl font-playfair">
            🗺️ Carte de Provence
          </h1>
          <p className="mt-4 text-lg text-amber-700">
            Explorez les villes authentiques de Provence
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Statistiques */}
        <div className="mb-6 text-center">
          <p className="text-sm text-amber-600">
            {filteredVilles.length} ville{filteredVilles.length > 1 ? 's' : ''} 
            {searchTerm && ` trouvée${filteredVilles.length > 1 ? 's' : ''} pour "${searchTerm}"`}
          </p>
        </div>

        {/* Carte */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="h-[600px] rounded-lg overflow-hidden">
            <DynamicMap villes={filteredVilles} />
          </div>
        </div>

        {/* Liste des villes (optionnel, en dessous de la carte) */}
        {searchTerm && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">
              Résultats de la recherche :
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVilles.map((ville) => (
                <div
                  key={ville.id}
                  className="bg-white p-4 rounded-lg shadow border border-amber-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => window.location.href = `/villes/${ville.id}`}
                >
                  <h4 className="font-semibold text-amber-900">{ville.nom}</h4>
                  {ville.region && (
                    <p className="text-sm text-amber-600">{ville.region}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
