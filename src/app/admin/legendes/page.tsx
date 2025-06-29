'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/lib/supabaseService';
import { Legende } from '@/types/database';
import Link from 'next/link';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function AdminLegendesPage() {
  const [legendes, setLegendes] = useState<Legende[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
      return;
    }
    loadLegendes();
  }, [isAdmin, router]);

  const loadLegendes = async () => {
    try {
      const data = await SupabaseService.getLegendes();
      setLegendes(data);
    } catch (error) {
      console.error('Erreur lors du chargement des légendes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, titre: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la légende "${titre}" ? Cette action est irréversible.`)) {
      return;
    }

    setDeleteLoading(id);
    try {
      await SupabaseService.deleteLegende(id);
      setLegendes(legendes.filter(l => l.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de la légende');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-amber-700 font-medium">Chargement des légendes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-900 font-playfair">
              Gestion des légendes
            </h1>
            <p className="mt-2 text-amber-600">
              {legendes.length} légende{legendes.length > 1 ? 's' : ''} référencée{legendes.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/admin"
              className="px-4 py-2 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-50 transition-colors"
            >
              ← Retour
            </Link>
            <Link
              href="/admin/legendes/new"
              className="flex items-center px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nouvelle légende
            </Link>
          </div>
        </div>

        {/* Liste des légendes */}
        {legendes.length > 0 ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-200">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                      Légende
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                      Ville
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                      Origine
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-amber-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-100">
                  {legendes.map((legende) => (
                    <tr key={legende.id} className="hover:bg-amber-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <SparklesIcon className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-amber-900">
                              {legende.titre}
                            </div>
                            {legende.contenu && (
                              <div className="text-sm text-amber-600 mt-1 line-clamp-2">
                                {legende.contenu.substring(0, 100)}...
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                        {legende.ville ? (
                          <div className="flex items-center">
                            <span className="font-medium">{legende.ville.nom}</span>
                            {legende.ville.departement && (
                              <span className="ml-1 text-amber-500">({legende.ville.departement})</span>
                            )}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                        {legende.origine || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/legendes/${legende.id}`}
                            className="text-amber-600 hover:text-orange-600 transition-colors"
                            title="Voir"
                          >
                            👁️
                          </Link>
                          <Link
                            href={`/admin/legendes/${legende.id}/edit`}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Modifier"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(legende.id, legende.titre)}
                            disabled={deleteLoading === legende.id}
                            className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                            title="Supprimer"
                          >
                            {deleteLoading === legende.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <SparklesIcon className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-900 mb-2">
              Aucune légende référencée
            </h3>
            <p className="text-amber-600 mb-6">
              Commencez par ajouter votre première légende de Provence.
            </p>
            <Link
              href="/admin/legendes/new"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Ajouter la première légende
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
