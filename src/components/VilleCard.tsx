import Link from 'next/link';
import { Ville } from '@/types/database';
import { MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';

interface VilleCardProps {
  ville: Ville;
}

export default function VilleCard({ ville }: VilleCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-200 hover:border-amber-400">
      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200">
        <div className="flex items-center justify-center">
          <span className="text-4xl">🏛️</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-amber-900 group-hover:text-orange-600 transition-colors">
            {ville.nom}
          </h3>
          {ville.code_postal && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              {ville.code_postal}
            </span>
          )}
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          {ville.departement && (
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2 text-amber-500" />
              <span>{ville.departement}</span>
            </div>
          )}
          
          {ville.population && (
            <div className="flex items-center">
              <UsersIcon className="h-4 w-4 mr-2 text-amber-500" />
              <span>{ville.population.toLocaleString()} habitants</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <Link
            href={`/villes/${ville.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Découvrir
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
