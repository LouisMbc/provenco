'use client';

import { useState, useEffect } from 'react';
import { Domaine, Ville, Appellation } from '@/types/database';
import { SupabaseService } from '@/lib/supabaseService';
import SimpleEditor from '@/components/SimpleEditor';

interface DomaineFormProps {
  domaine?: Domaine;
  onSubmit: (domaineData: Omit<Domaine, 'id'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function DomaineForm({ domaine, onSubmit, onCancel, loading = false }: DomaineFormProps) {
  const [formData, setFormData] = useState({
    nom: domaine?.nom || '',
    ville_id: domaine?.ville_id?.toString() || '',
    adresse: domaine?.adresse || '',
    description: domaine?.description || '',
    appellation_id: domaine?.appellation_id?.toString() || ''
  });

  const [villes, setVilles] = useState<Ville[]>([]);
  const appellations: Appellation[] = []; // TODO: Load appellations from API
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const villesData = await SupabaseService.getVilles();
      setVilles(villesData);
      // TODO: Charger les appellations
      // const appellationsData = await SupabaseService.getAppellations();
      // setAppellations(appellationsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom du domaine est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const domaineData: Omit<Domaine, 'id'> = {
      nom: formData.nom.trim(),
      ville_id: formData.ville_id ? parseInt(formData.ville_id) : undefined,
      adresse: formData.adresse.trim() || undefined,
      description: formData.description.trim() || undefined,
      appellation_id: formData.appellation_id ? parseInt(formData.appellation_id) : undefined
    };
    
    await onSubmit(domaineData);
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
              Nom du domaine *
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
              placeholder="Ex: Château de Provence, Domaine des Oliviers..."
            />
            {errors.nom && (
              <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
            )}
          </div>

          {/* Ville */}
          <div>
            <label htmlFor="ville_id" className="block text-sm font-medium text-amber-700">
              Ville
            </label>
            <select
              id="ville_id"
              name="ville_id"
              value={formData.ville_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Sélectionnez une ville</option>
              {villes.map((ville) => (
                <option key={ville.id} value={ville.id}>
                  {ville.nom} {ville.departement && `(${ville.departement})`}
                </option>
              ))}
            </select>
          </div>

          {/* Appellation */}
          <div>
            <label htmlFor="appellation_id" className="block text-sm font-medium text-amber-700">
              Appellation
            </label>
            <select
              id="appellation_id"
              name="appellation_id"
              value={formData.appellation_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Sélectionnez une appellation</option>
              {appellations.map((appellation) => (
                <option key={appellation.id} value={appellation.id}>
                  {appellation.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label htmlFor="adresse" className="block text-sm font-medium text-amber-700">
            Adresse
          </label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="Adresse complète du domaine"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-amber-700">
            Description du domaine
          </label>
          <div className="mt-1">
            <SimpleEditor
              content={formData.description}
              onChange={(content: string) => {
                setFormData(prev => ({ ...prev, description: content }));
              }}
              placeholder="Décrivez ce domaine, son histoire, ses méthodes de vinification, son terroir..."
              bucket="domaines"
              entityId={domaine?.id}
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
                {domaine ? 'Modification...' : 'Création...'}
              </div>
            ) : (
              domaine ? 'Modifier' : 'Créer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
