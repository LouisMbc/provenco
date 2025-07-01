'use client';

import { useState, useEffect } from 'react';
import { Legende, Ville } from '@/types/database';
import { SupabaseService } from '@/lib/supabaseService';
import SimpleEditor from '@/components/SimpleEditor';

interface LegendeFormProps {
  legende?: Legende;
  onSubmit: (legendeData: Omit<Legende, 'id'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function LegendeForm({ legende, onSubmit, onCancel, loading = false }: LegendeFormProps) {
  const [formData, setFormData] = useState({
    ville_id: legende?.ville_id?.toString() || '',
    titre: legende?.titre || '',
    contenu: legende?.contenu || '',
    origine: legende?.origine || ''
  });

  const [villes, setVilles] = useState<Ville[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadVilles();
  }, []);

  const loadVilles = async () => {
    try {
      const data = await SupabaseService.getVilles();
      setVilles(data);
    } catch (error) {
      console.error('Erreur lors du chargement des villes:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.ville_id.trim()) {
      newErrors.ville_id = 'La ville est requise';
    }
    
    if (!formData.titre.trim()) {
      newErrors.titre = 'Le titre est requis';
    }
    
    if (!formData.contenu.trim()) {
      newErrors.contenu = 'Le contenu est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const legendeData: Omit<Legende, 'id'> = {
      ville_id: parseInt(formData.ville_id),
      titre: formData.titre.trim(),
      contenu: formData.contenu.trim(),
      origine: formData.origine.trim() || undefined
    };
    
    await onSubmit(legendeData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur corrige le champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ville */}
          <div>
            <label htmlFor="ville_id" className="block text-sm font-medium text-amber-700">
              Ville de Provence *
            </label>
            <select
              id="ville_id"
              name="ville_id"
              value={formData.ville_id}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 ${
                errors.ville_id ? 'border-red-300' : 'border-amber-300'
              }`}
              required
            >
              <option value="">Choisissez la ville concernée par cette légende</option>
              {villes.map((ville) => (
                <option key={ville.id} value={ville.id}>
                  {ville.nom} {ville.departement && `(${ville.departement})`}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-amber-600">
              Chaque légende doit être rattachée à une ville de Provence
            </p>
            {errors.ville_id && (
              <p className="mt-1 text-sm text-red-600">{errors.ville_id}</p>
            )}
          </div>

          {/* Origine */}
          <div>
            <label htmlFor="origine" className="block text-sm font-medium text-amber-700">
              Origine de la légende
            </label>
            <input
              type="text"
              id="origine"
              name="origine"
              value={formData.origine}
              onChange={handleChange}
              placeholder="Ex: Tradition orale, Folklore local..."
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Titre */}
        <div>
          <label htmlFor="titre" className="block text-sm font-medium text-amber-700">
            Titre de la légende *
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 ${
              errors.titre ? 'border-red-300' : 'border-amber-300'
            }`}
          />
          {errors.titre && (
            <p className="mt-1 text-sm text-red-600">{errors.titre}</p>
          )}
        </div>

        {/* Contenu */}
        <div>
          <label htmlFor="contenu" className="block text-sm font-medium text-amber-700">
            Contenu de la légende *
          </label>
          <div className="mt-1">
            <SimpleEditor
              content={formData.contenu}
              onChange={(content: string) => {
                setFormData(prev => ({ ...prev, contenu: content }));
                if (errors.contenu) {
                  setErrors(prev => ({ ...prev, contenu: '' }));
                }
              }}
              placeholder="Racontez cette légende provençale..."
              bucket="legende"
              entityId={legende?.id}
            />
          </div>
          {errors.contenu && (
            <p className="mt-1 text-sm text-red-600">{errors.contenu}</p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 border border-amber-300 text-amber-700 rounded-md hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {legende ? 'Modification...' : 'Création...'}
              </div>
            ) : (
              legende ? 'Modifier' : 'Créer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
