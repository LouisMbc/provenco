'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { 
  PlusIcon, 
  MapIcon, 
  BookOpenIcon, 
  SparklesIcon, 
  BuildingLibraryIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export default function AdminPage() {
  const { isAdmin, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-amber-700 font-medium">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const adminActions = [
    {
      title: 'Gérer les villes',
      description: 'Ajouter, modifier ou supprimer des villes de Provence',
      href: '/admin/villes',
      icon: MapIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Gérer les histoires',
      description: 'Créer des récits historiques liés aux villes',
      href: '/admin/histoires',
      icon: BookOpenIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Gérer les légendes',
      description: 'Ajouter des légendes rattachées aux villes',
      href: '/admin/legendes',
      icon: SparklesIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Gérer les monuments',
      description: 'Référencer monuments par ville',
      href: '/admin/monuments',
      icon: BuildingLibraryIcon,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  ];

  const wineActions = [
    {
      title: 'Gérer les appellations',
      description: 'AOC et territoires viticoles de Provence',
      href: '/admin/appellations',
      icon: MapIcon,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Gérer les domaines',
      description: 'Producteurs et châteaux viticoles',
      href: '/admin/domaines',
      icon: BuildingLibraryIcon,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Gérer les vins',
      description: 'Cuvées et productions des domaines',
      href: '/admin/vins',
      icon: BoltIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Gérer les cépages',
      description: 'Variétés de raisin et caractéristiques',
      href: '/admin/cepages',
      icon: SparklesIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const quickStats = [
    { name: 'Villes', value: '?', icon: MapIcon },
    { name: 'Histoires', value: '?', icon: BookOpenIcon },
    { name: 'Légendes', value: '?', icon: SparklesIcon },
    { name: 'Monuments', value: '?', icon: BuildingLibraryIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl font-playfair">
            🛠️ Administration
          </h1>
          <p className="mt-6 text-lg leading-8 text-amber-700">
            Bienvenue, {user?.email}. Gérez le contenu de Provence Authentique.
          </p>
          
          {/* Note explicative */}
          <div className="mt-8 mx-auto max-w-3xl bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-left">
                <h3 className="text-sm font-medium text-blue-900">Organisation du contenu</h3>
                <p className="mt-1 text-sm text-blue-700">
                  <strong>Commencez par créer vos villes</strong> - Toutes les histoires, légendes et monuments doivent être rattachés à une ville de Provence. 
                  Sans villes, vous ne pourrez pas ajouter d&apos;autre contenu.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {quickStats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow-md rounded-lg border border-amber-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-amber-600" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-amber-500 truncate">{stat.name}</dt>
                      <dd className="text-lg font-medium text-amber-900">{stat.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions principales - Patrimoine */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-8">
            🏛️ Gestion du Patrimoine
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {adminActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`group relative block p-8 ${action.bgColor} rounded-xl border ${action.borderColor} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${action.color} text-white`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-amber-900 group-hover:text-orange-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="mt-2 text-amber-600">
                      {action.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-amber-600 group-hover:text-orange-600">
                      <span>Accéder</span>
                      <PlusIcon className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Actions principales - Vin */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-8">
            🍷 Gestion des Vins
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {wineActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`group relative block p-8 ${action.bgColor} rounded-xl border ${action.borderColor} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${action.color} text-white`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-amber-900 group-hover:text-orange-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="mt-2 text-amber-600">
                      {action.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-amber-600 group-hover:text-orange-600">
                      <span>Accéder</span>
                      <PlusIcon className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Actions secondaires */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-amber-900 font-playfair mb-8">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/villes/new"
              className="flex items-center justify-center px-6 py-4 border border-amber-300 rounded-lg text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Ajouter une ville
            </Link>
            <Link
              href="/admin/histoires/new"
              className="flex items-center justify-center px-6 py-4 border border-amber-300 rounded-lg text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Ajouter une histoire
            </Link>
            <Link
              href="/admin/legendes/new"
              className="flex items-center justify-center px-6 py-4 border border-amber-300 rounded-lg text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Ajouter une légende
            </Link>
          </div>
        </div>

        {/* Footer admin */}
        <div className="mt-16 pt-8 border-t border-amber-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-amber-600">
              Dernière connexion : {new Date().toLocaleDateString('fr-FR')}
            </p>
            <Link
              href="/"
              className="text-sm text-amber-600 hover:text-orange-600 transition-colors"
            >
              Voir le site public →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
