'use client';

import { useState } from 'react';
import { Cepage } from '@/types/database';
import SimpleEditor from '@/components/SimpleEditor';

interface CepageFormProps {
  cepage?: Cepage;
  onSubmit: (cepageData: Omit<Cepage, 'id'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function CepageForm({ cepage, onSubmit, onCancel, loading = false }: CepageFormProps) {
  const [formData, setFormData] = useState({
    nom: cepage?.nom || '',
    couleur: cepage?.couleur || 'rouge' as 'rouge' | 'blanc' | 'rosé',
    description: cepage?.description || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom du cépage est requis';
    }
    
    if (!formData.couleur) {
      newErrors.couleur = 'La couleur est requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const cepageData: Omit<Cepage, 'id'> = {
      nom: formData.nom.trim(),
      couleur: formData.couleur,
      description: formData.description.trim() || undefined
    };
    
    await onSubmit(cepageData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-amber-700">
              Nom du cépage *
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 ${
                errors.nom ? 'border-red-300' : 'border-amber-300'
              }`}
              placeholder="Ex: Grenache, Syrah, Mourvèdre..."
            />
            {errors.nom && (
              <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
            )}
          </div>

          {/* Couleur */}
          <div>
            <label htmlFor="couleur" className="block text-sm font-medium text-amber-700">
              Couleur *
            </label>
            <select
              id="couleur"
              name="couleur"
              value={formData.couleur}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 ${
                errors.couleur ? 'border-red-300' : 'border-amber-300'
              }`}
              required
            >
              <option value="rouge">Rouge</option>
              <option value="blanc">Blanc</option>
              <option value="rosé">Rosé</option>
            </select>
            {errors.couleur && (
              <p className="mt-1 text-sm text-red-600">{errors.couleur}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-amber-700">
            Description du cépage
          </label>
          <div className="mt-1">
            <SimpleEditor
              content={formData.description}
              onChange={(content: string) => {
                setFormData(prev => ({ ...prev, description: content }));
              }}
              placeholder="Décrivez ce cépage, ses caractéristiques, son terroir, ses arômes..."
              bucket="cepages"
              entityId={cepage?.id}
            />
          </div>
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
                {cepage ? 'Modification...' : 'Création...'}
              </div>
            ) : (
              cepage ? 'Modifier' : 'Créer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
