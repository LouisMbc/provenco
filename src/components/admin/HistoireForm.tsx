'use client';

import { useState, useEffect } from 'react';
import { Histoire, Ville } from '@/types/database';
import { SupabaseService } from '@/lib/supabaseService';

interface HistoireFormProps {
  histoire?: Histoire;
  onSubmit: (histoireData: Omit<Histoire, 'id'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function HistoireForm({ histoire, onSubmit, onCancel, loading = false }: HistoireFormProps) {
  const [formData, setFormData] = useState({
    ville_id: histoire?.ville_id?.toString() || '',
    titre: histoire?.titre || '',
    contenu: histoire?.contenu || '',
    periode: histoire?.periode || ''
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
    
    const histoireData: Omit<Histoire, 'id'> = {
      ville_id: parseInt(formData.ville_id),
      titre: formData.titre.trim(),
      contenu: formData.contenu.trim(),
      periode: formData.periode.trim() || undefined
    };
    
    await onSubmit(histoireData);
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
              <option value="">Choisissez la ville concernée par cette histoire</option>
              {villes.map((ville) => (
                <option key={ville.id} value={ville.id}>
                  {ville.nom} {ville.departement && `(${ville.departement})`}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-amber-600">
              Chaque histoire doit être rattachée à une ville de Provence
            </p>
            {errors.ville_id && (
              <p className="mt-1 text-sm text-red-600">{errors.ville_id}</p>
            )}
          </div>

          {/* Période */}
          <div>
            <label htmlFor="periode" className="block text-sm font-medium text-amber-700">
              Période historique
            </label>
            <input
              type="text"
              id="periode"
              name="periode"
              value={formData.periode}
              onChange={handleChange}
              placeholder="Ex: Antiquité, Moyen Âge, Renaissance..."
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Titre */}
        <div>
          <label htmlFor="titre" className="block text-sm font-medium text-amber-700">
            Titre de l&apos;histoire *
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
            Contenu de l&apos;histoire *
          </label>
          <textarea
            id="contenu"
            name="contenu"
            value={formData.contenu}
            onChange={handleChange}
            rows={12}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 ${
              errors.contenu ? 'border-red-300' : 'border-amber-300'
            }`}
            placeholder="Racontez l'histoire de cette ville de Provence..."
          />
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
                {histoire ? 'Modification...' : 'Création...'}
              </div>
            ) : (
              histoire ? 'Modifier' : 'Créer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
