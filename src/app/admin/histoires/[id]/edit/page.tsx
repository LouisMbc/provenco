'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/lib/supabaseService';
import HistoireForm from '@/components/admin/HistoireForm';
import { Histoire } from '@/types/database';

export default function AdminHistoireEditPage() {
  const [histoire, setHistoire] = useState<Histoire | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { isAdmin } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
      return;
    }
    
    if (isNaN(id)) {
      router.push('/admin/histoires');
      return;
    }
    
    const loadHistoire = async () => {
      try {
        const data = await SupabaseService.getHistoireById(id);
        if (!data) {
          router.push('/admin/histoires');
          return;
        }
        setHistoire(data);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        router.push('/admin/histoires');
      } finally {
        setLoading(false);
      }
    };
    
    loadHistoire();
  }, [isAdmin, id, router]);

  const handleSubmit = async (histoireData: Omit<Histoire, 'id'>) => {
    setSubmitLoading(true);
    try {
      await SupabaseService.updateHistoire(id, histoireData);
      router.push('/admin/histoires');
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      alert('Erreur lors de la modification de l\'histoire');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/histoires');
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-amber-700 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!histoire) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-amber-900 mb-2">Histoire introuvable</h2>
          <p className="text-amber-600 mb-4">L&apos;histoire demandée n&apos;existe pas.</p>
          <button
            onClick={() => router.push('/admin/histoires')}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 font-playfair">
            Modifier &quot;{histoire.titre}&quot;
          </h1>
          <p className="mt-2 text-amber-600">
            Modifiez les informations de cette histoire.
          </p>
        </div>

        <HistoireForm
          histoire={histoire}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={submitLoading}
        />
      </div>
    </div>
  );
}
