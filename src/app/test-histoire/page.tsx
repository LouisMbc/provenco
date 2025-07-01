import { Histoire } from '@/types/database';
import { SupabaseService } from '@/lib/supabaseService';
import HistoireForm from '@/components/admin/HistoireForm';
import { redirect } from 'next/navigation';

export default function TestHistoirePage() {
  async function handleSubmit(histoireData: Omit<Histoire, 'id'>) {
    'use server';
    try {
      await SupabaseService.createHistoire(histoireData);
      redirect('/histoires');
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }

  async function handleCancel() {
    'use server';
    redirect('/histoires');
  }

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900 font-playfair">
            Créer une nouvelle histoire
          </h1>
          <p className="mt-4 text-lg text-amber-700">
            Utilisez l&apos;éditeur riche pour créer un récit captivant avec du formatage avancé et des images
          </p>
        </div>
        
        <HistoireForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
