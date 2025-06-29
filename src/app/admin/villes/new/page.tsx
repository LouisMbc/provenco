'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/lib/supabaseService';
import VilleForm from '@/components/admin/VilleForm';
import { Ville } from '@/types/database';

export default function AdminVilleNewPage() {
  const [loading, setLoading] = useState(false);
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-amber-700 font-medium">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const normalizeCoordinates = (villeData: Omit<Ville, 'id'>) => {
    return {
      ...villeData,
      latitude: villeData.latitude ? parseFloat(villeData.latitude.toString().replace(',', '.')) : villeData.latitude,
      longitude: villeData.longitude ? parseFloat(villeData.longitude.toString().replace(',', '.')) : villeData.longitude,
    };
  };

  const handleSubmit = async (villeData: Omit<Ville, 'id'>) => {
    setLoading(true);
    try {
      const normalizedData = normalizeCoordinates(villeData);
      await SupabaseService.createVille(normalizedData);
      router.push('/admin/villes');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création de la ville');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/villes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 font-playfair">
            Nouvelle ville
          </h1>
          <p className="mt-2 text-amber-600">
            Ajoutez une nouvelle ville de Provence à votre collection.
          </p>
        </div>

        <VilleForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
}
