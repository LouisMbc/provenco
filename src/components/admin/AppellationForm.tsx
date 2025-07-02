'use client';

import { useState } from 'react';
import { Appellation } from '@/types/database';
import SimpleEditor from '@/components/SimpleEditor';

interface AppellationFormProps {
  appellation?: Appellation;
  onSubmit: (appellationData: Omit<Appellation, 'id'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function AppellationForm({ appellation, onSubmit, onCancel, loading = false }: AppellationFormProps) {
  const [formData, setFormData] = useState({
    nom: appellation?.nom || '',
    region: appellation?.region || '',
    description: appellation?.description || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const regions = [
    'Côtes de Provence',
    'Coteaux d\'Aix-en-Provence',
    'Coteaux Varois en Provence',
    'Bandol',
    'Cassis',
    'Palette',
    'Bellet',
    'Pierrevert'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom de l\'appellation est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const appellationData: Omit<Appellation, 'id'> = {
      nom: formData.nom.trim(),
      region: formData.region.trim() || undefined,
      description: formData.description.trim() || undefined
    };
    
    await onSubmit(appellationData);
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
              Nom de l&apos;appellation *
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
              placeholder="Ex: AOC Côtes de Provence, IGP Var..."
            />
            {errors.nom && (
              <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
            )}
          </div>

          {/* Région */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-amber-700">
              Région
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Sélectionnez une région</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-amber-700">
            Description de l&apos;appellation
          </label>
          <div className="mt-1">
            <SimpleEditor
              content={formData.description}
              onChange={(content: string) => {
                setFormData(prev => ({ ...prev, description: content }));
              }}
              placeholder="Décrivez cette appellation, son terroir, ses caractéristiques, son histoire..."
              bucket="appellations"
              entityId={appellation?.id}
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
                {appellation ? 'Modification...' : 'Création...'}
              </div>
            ) : (
              appellation ? 'Modifier' : 'Créer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
