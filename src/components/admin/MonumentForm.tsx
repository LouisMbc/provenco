'use client';

import { useState, useEffect } from 'react';
import { Monument, Ville } from '@/types/database';
import { SupabaseService } from '@/lib/supabaseService';

interface MonumentFormProps {
  monument?: Monument;
  onSubmit: (monumentData: Omit<Monument, 'id'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function MonumentForm({ monument, onSubmit, onCancel, loading = false }: MonumentFormProps) {
  const [formData, setFormData] = useState({
    ville_id: monument?.ville_id?.toString() || '',
    nom: monument?.nom || '',
    type: monument?.type || '',
    date_construction: monument?.date_construction || '',
    description: monument?.description || ''
  });

  const [villes, setVilles] = useState<Ville[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const typesMonuments = [
    'Église',
    'Cathédrale',
    'Château',
    'Palais',
    'Tour',
    'Beffroi',
    'Pont',
    'Aqueduc',
    'Amphithéâtre',
    'Théâtre',
    'Musée',
    'Abbaye',
    'Chapelle',
    'Fort',
    'Porte',
    'Fontaine',
    'Autre'
  ];

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
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const monumentData: Omit<Monument, 'id'> = {
      ville_id: parseInt(formData.ville_id),
      nom: formData.nom.trim(),
      type: formData.type.trim() || undefined,
      date_construction: formData.date_construction.trim() || undefined,
      description: formData.description.trim() || undefined
    };
    
    await onSubmit(monumentData);
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
              <option value="">Choisissez la ville où se trouve ce monument</option>
              {villes.map((ville) => (
                <option key={ville.id} value={ville.id}>
                  {ville.nom} {ville.departement && `(${ville.departement})`}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-amber-600">
              Chaque monument doit être rattaché à une ville de Provence
            </p>
            {errors.ville_id && (
              <p className="mt-1 text-sm text-red-600">{errors.ville_id}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-amber-700">
              Type de monument
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Sélectionnez un type</option>
              {typesMonuments.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nom */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-amber-700">
            Nom du monument *
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
          />
          {errors.nom && (
            <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
          )}
        </div>

        {/* Date de construction */}
        <div>
          <label htmlFor="date_construction" className="block text-sm font-medium text-amber-700">
            Date ou période de construction
          </label>
          <input
            type="text"
            id="date_construction"
            name="date_construction"
            value={formData.date_construction}
            onChange={handleChange}
            placeholder="Ex: XIIe siècle, 1150, 12ème siècle..."
            className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-amber-700">
            Description du monument
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={8}
            className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="Décrivez ce monument, son histoire, son architecture..."
          />
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
                {monument ? 'Modification...' : 'Création...'}
              </div>
            ) : (
              monument ? 'Modifier' : 'Créer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
