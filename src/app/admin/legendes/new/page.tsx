'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/lib/supabaseService';
import LegendeForm from '@/components/admin/LegendeForm';
import { Legende } from '@/types/database';

export default function AdminLegendeNewPage() {
  const [loading, setLoading] = useState(false);
  const [villesCount, setVillesCount] = useState<number>(0);
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
      return;
    }
    
    // Vérifier qu'il y a des villes disponibles
    const checkVilles = async () => {
      try {
        const villes = await SupabaseService.getVilles();
        setVillesCount(villes.length);
      } catch (error) {
        console.error('Erreur lors de la vérification des villes:', error);
      }
    };
    
    checkVilles();
  }, [isAdmin, router]);

  if (!isAdmin) {
    router.push('/login');
    return null;
  }

  // Si aucune ville n'est disponible, afficher un message
  if (villesCount === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-amber-900 font-playfair mb-4">
              Nouvelle légende
            </h1>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <svg className="h-12 w-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-amber-900 mb-2">
                Aucune ville disponible
              </h2>
              <p className="text-amber-700 mb-6">
                Vous devez d&apos;abord ajouter des villes avant de pouvoir créer des légendes. 
                Chaque légende doit être rattachée à une ville de Provence.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/admin/villes/new"
                  className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
                >
                  Ajouter une ville
                </Link>
                <Link
                  href="/admin"
                  className="px-6 py-2 border border-amber-300 text-amber-700 rounded-md hover:bg-amber-50 transition-colors"
                >
                  Retour à l&apos;administration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (legendeData: Omit<Legende, 'id'>) => {
    setLoading(true);
    try {
      await SupabaseService.createLegende(legendeData);
      router.push('/admin/legendes');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création de la légende');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/legendes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 font-playfair">
            Nouvelle légende
          </h1>
          <p className="mt-2 text-amber-600">
            Ajoutez une nouvelle légende de Provence à votre collection.
          </p>
        </div>

        <LegendeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
}
