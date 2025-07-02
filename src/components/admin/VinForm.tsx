'use client';

import { useState, useEffect } from 'react';
import { Vin, Domaine, Appellation, TypeVin } from '@/types/database';
import SimpleEditor from '@/components/SimpleEditor';

interface VinFormProps {
  vin?: Vin;
  onSubmit: (vinData: Omit<Vin, 'id'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function VinForm({ vin, onSubmit, onCancel, loading = false }: VinFormProps) {
  const [formData, setFormData] = useState({
    nom: vin?.nom || '',
    appellation_id: vin?.appellation_id?.toString() || '',
    domaine_id: vin?.domaine_id?.toString() || '',
    type_vin_id: vin?.type_vin_id?.toString() || '',
    annee: vin?.annee?.toString() || '',
    description: vin?.description || '',
    prix: vin?.prix?.toString() || ''
  });

  const [domaines] = useState<Domaine[]>([]);
  const [appellations] = useState<Appellation[]>([]);
  const [typesVin] = useState<TypeVin[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger les données depuis Supabase (à implémenter dans SupabaseService)
      // const [domainesData, appellationsData, typesVinData] = await Promise.all([
      //   SupabaseService.getDomaines(),
      //   SupabaseService.getAppellations(),
      //   SupabaseService.getTypesVin()
      // ]);
      // setDomaines(domainesData);
      // setAppellations(appellationsData);
      // setTypesVin(typesVinData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom du vin est requis';
    }
    
    if (formData.prix && isNaN(parseFloat(formData.prix))) {
      newErrors.prix = 'Le prix doit être un nombre valide';
    }
    
    if (formData.annee && (isNaN(parseInt(formData.annee)) || parseInt(formData.annee) < 1900 || parseInt(formData.annee) > new Date().getFullYear())) {
      newErrors.annee = 'L\'année doit être valide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const vinData: Omit<Vin, 'id'> = {
      nom: formData.nom.trim(),
      appellation_id: formData.appellation_id ? parseInt(formData.appellation_id) : undefined,
      domaine_id: formData.domaine_id ? parseInt(formData.domaine_id) : undefined,
      type_vin_id: formData.type_vin_id ? parseInt(formData.type_vin_id) : undefined,
      annee: formData.annee ? parseInt(formData.annee) : undefined,
      description: formData.description.trim() || undefined,
      prix: formData.prix ? parseFloat(formData.prix) : undefined
    };
    
    await onSubmit(vinData);
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
              Nom du vin / Cuvée *
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
              placeholder="Ex: Cuvée Prestige, Tradition..."
            />
            {errors.nom && (
              <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
            )}
          </div>

          {/* Domaine */}
          <div>
            <label htmlFor="domaine_id" className="block text-sm font-medium text-amber-700">
              Domaine
            </label>
            <select
              id="domaine_id"
              name="domaine_id"
              value={formData.domaine_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Sélectionnez un domaine</option>
              {domaines.map((domaine) => (
                <option key={domaine.id} value={domaine.id}>
                  {domaine.nom}
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

          {/* Type de vin */}
          <div>
            <label htmlFor="type_vin_id" className="block text-sm font-medium text-amber-700">
              Type de vin
            </label>
            <select
              id="type_vin_id"
              name="type_vin_id"
              value={formData.type_vin_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Sélectionnez un type</option>
              {typesVin.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Année */}
          <div>
            <label htmlFor="annee" className="block text-sm font-medium text-amber-700">
              Millésime
            </label>
            <input
              type="number"
              id="annee"
              name="annee"
              value={formData.annee}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 ${
                errors.annee ? 'border-red-300' : 'border-amber-300'
              }`}
              placeholder="Ex: 2022"
            />
            {errors.annee && (
              <p className="mt-1 text-sm text-red-600">{errors.annee}</p>
            )}
          </div>

          {/* Prix */}
          <div>
            <label htmlFor="prix" className="block text-sm font-medium text-amber-700">
              Prix (€)
            </label>
            <input
              type="number"
              id="prix"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 ${
                errors.prix ? 'border-red-300' : 'border-amber-300'
              }`}
              placeholder="Ex: 15.90"
            />
            {errors.prix && (
              <p className="mt-1 text-sm text-red-600">{errors.prix}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-amber-700">
            Description du vin
          </label>
          <div className="mt-1">
            <SimpleEditor
              content={formData.description}
              onChange={(content: string) => {
                setFormData(prev => ({ ...prev, description: content }));
              }}
              placeholder="Décrivez ce vin, ses arômes, sa dégustation, ses accords mets et vins..."
              bucket="vins"
              entityId={vin?.id}
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
                {vin ? 'Modification...' : 'Création...'}
              </div>
            ) : (
              vin ? 'Modifier' : 'Créer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
