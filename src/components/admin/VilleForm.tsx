'use client';

import { useState } from 'react';
import { Ville } from '@/types/database';

interface VilleFormProps {
  ville?: Ville;
  onSubmit: (villeData: Omit<Ville, 'id'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function VilleForm({ ville, onSubmit, onCancel, loading = false }: VilleFormProps) {
  const [formData, setFormData] = useState({
    nom: ville?.nom || '',
    code_postal: ville?.code_postal || '',
    departement: ville?.departement || '',
    region: ville?.region || 'Provence',
    population: ville?.population || '',
    latitude: ville?.latitude || '',
    longitude: ville?.longitude || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const departements = [
    'Bouches-du-Rhône',
    'Var', 
    'Vaucluse',
    'Alpes-de-Haute-Provence',
    'Alpes-Maritimes'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom de la ville est requis';
    }
    
    if (formData.code_postal && !/^\d{4,6}$/.test(formData.code_postal)) {
      newErrors.code_postal = 'Le code postal doit contenir entre 4 et 6 chiffres';
    }
    
    if (formData.population && isNaN(Number(formData.population))) {
      newErrors.population = 'La population doit être un nombre';
    }
    
    if (formData.latitude && (isNaN(Number(formData.latitude)) || Number(formData.latitude) < -90 || Number(formData.latitude) > 90)) {
      newErrors.latitude = 'La latitude doit être un nombre entre -90 et 90';
    }
    
    if (formData.longitude && (isNaN(Number(formData.longitude)) || Number(formData.longitude) < -180 || Number(formData.longitude) > 180)) {
      newErrors.longitude = 'La longitude doit être un nombre entre -180 et 180';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const villeData: Omit<Ville, 'id'> = {
      nom: formData.nom.trim(),
      code_postal: formData.code_postal.trim() || undefined,
      departement: formData.departement.trim() || undefined,
      region: formData.region.trim(),
      population: formData.population ? Number(formData.population) : undefined,
      latitude: formData.latitude ? Number(formData.latitude) : undefined,
      longitude: formData.longitude ? Number(formData.longitude) : undefined
    };
    
    await onSubmit(villeData);
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
              Nom de la ville *
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                errors.nom ? 'border-red-300' : 'border-amber-300'
              }`}
              placeholder="Ex: Aix-en-Provence"
            />
            {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
          </div>

          {/* Code postal */}
          <div>
            <label htmlFor="code_postal" className="block text-sm font-medium text-amber-700">
              Code postal
            </label>
            <input
              type="text"
              id="code_postal"
              name="code_postal"
              value={formData.code_postal}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                errors.code_postal ? 'border-red-300' : 'border-amber-300'
              }`}
              placeholder="Ex: 13100, 06000"
              maxLength={6}
            />
            {errors.code_postal && <p className="mt-1 text-sm text-red-600">{errors.code_postal}</p>}
          </div>

          {/* Département */}
          <div>
            <label htmlFor="departement" className="block text-sm font-medium text-amber-700">
              Département
            </label>
            <select
              id="departement"
              name="departement"
              value={formData.departement}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Sélectionner un département</option>
              {departements.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Région */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-amber-700">
              Région
            </label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:ring-amber-500 focus:border-amber-500"
              placeholder="Ex: Provence"
            />
          </div>

          {/* Population */}
          <div>
            <label htmlFor="population" className="block text-sm font-medium text-amber-700">
              Population
            </label>
            <input
              type="text"
              id="population"
              name="population"
              value={formData.population}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                errors.population ? 'border-red-300' : 'border-amber-300'
              }`}
              placeholder="ex: 145 325"
            />
            <p className="mt-1 text-xs text-gray-500">Les espaces sont autorisés (ex: 22 500)</p>
            {errors.population && <p className="mt-1 text-sm text-red-600">{errors.population}</p>}
          </div>

          {/* Latitude */}
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-amber-700">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                errors.latitude ? 'border-red-300' : 'border-amber-300'
              }`}
              placeholder="ex: 43,529742"
            />
            <p className="mt-1 text-xs text-gray-500">Utilisez la virgule comme séparateur décimal</p>
            {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
          </div>

          {/* Longitude */}
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-amber-700">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
                errors.longitude ? 'border-red-300' : 'border-amber-300'
              }`}
              placeholder="ex: 5,447427"
            />
            <p className="mt-1 text-xs text-gray-500">Utilisez la virgule comme séparateur décimal</p>
            {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
          </div>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-amber-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-50 transition-colors"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md hover:from-amber-700 hover:to-orange-700 transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enregistrement...
              </div>
            ) : (
              ville ? 'Modifier' : 'Créer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
