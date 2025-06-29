'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SupabaseService } from '@/lib/supabaseService';
import { Ville } from '@/types/database';
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const DynamicMapPreview = dynamic(() => import('@/components/MapPreview'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        <p className="mt-2 text-amber-700 font-medium">Chargement...</p>
      </div>
    </div>
  )
}) as React.ComponentType<{ villes: Ville[] }>;

export default function MapCard() {
  const [villes, setVilles] = useState<Ville[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVilles();
  }, []);

  const loadVilles = async () => {
    try {
      const data = await SupabaseService.getVilles();
      // Filtrer les villes qui ont des coordonnées et prendre un échantillon
      const villesAvecCoordonnees = data.filter(ville => 
        ville.latitude !== null && ville.longitude !== null
      );
      // Prendre les 10 premières villes pour l'aperçu
      setVilles(villesAvecCoordonnees.slice(0, 10));
    } catch (error) {
      console.error('Erreur lors du chargement des villes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href="/carte" className="group block">
      <div className="relative bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1">
        {/* Header de la carte */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-amber-500 p-2 rounded-lg">
                <MapPinIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Carte Interactive</h3>
                <p className="text-white/80 text-sm">Explorez la Provence</p>
              </div>
            </div>
            <MagnifyingGlassIcon className="h-5 w-5 text-white/80" />
          </div>
        </div>

        {/* Aperçu de la carte */}
        <div className="h-64 relative">
          {loading ? (
            <div className="h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                <p className="mt-2 text-amber-700 font-medium">Chargement...</p>
              </div>
            </div>
          ) : (
            <DynamicMapPreview villes={villes} />
          )}
          
          {/* Overlay avec effet de survol */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Footer avec statistiques */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-900">{villes.length}+</div>
                <div className="text-xs text-amber-600">Villes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-900">4</div>
                <div className="text-xs text-amber-600">Départements</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-amber-600 group-hover:text-orange-600 transition-colors">
              <span className="text-sm font-medium">Découvrir</span>
              <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Badge "Interactive" */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            ✨ Interactive
          </div>
        </div>
      </div>
    </Link>
  );
}
