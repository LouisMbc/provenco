'use client';

import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<React.ComponentProps<'svg'>>;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
}

export default function Breadcrumb({ 
  items, 
  showBackButton = true, 
  backHref, 
  backLabel = "Retour" 
}: BreadcrumbProps) {
  const pathname = usePathname();

  // Génération automatique du breadcrumb basé sur l'URL si pas d'items fournis
  const generateBreadcrumb = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Accueil', href: '/', icon: HomeIcon }
    ];

    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Mapping des segments vers des labels lisibles
      const segmentLabels: Record<string, string> = {
        'admin': 'Administration',
        'villes': 'Villes',
        'monuments': 'Monuments',
        'histoires': 'Histoires',
        'legendes': 'Légendes',
        'appellations': 'Appellations',
        'domaines': 'Domaines',
        'vins': 'Vins',
        'cepages': 'Cépages',
        'carte': 'Carte',
        'login': 'Connexion',
        'new': 'Nouveau',
        'edit': 'Modifier'
      };

      const label = segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Ne pas ajouter le dernier segment s'il s'agit de la page actuelle
      if (index < segments.length - 1 || segments.length === 1) {
        breadcrumbItems.push({ label, href: currentPath });
      }
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = items || generateBreadcrumb();
  
  // Déterminer le lien de retour automatiquement
  const getBackHref = (): string => {
    if (backHref) return backHref;
    
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length <= 1) return '/';
    
    // Retourner au niveau parent
    segments.pop();
    return segments.length > 0 ? `/${segments.join('/')}` : '/';
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Bouton retour */}
          {showBackButton && (
            <Link
              href={getBackHref()}
              className="inline-flex items-center text-sm text-gray-600 hover:text-amber-600 transition-colors group"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              {backLabel}
            </Link>
          )}

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <div key={item.href} className="flex items-center space-x-2">
                {index > 0 && (
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                )}
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 hover:text-amber-600 transition-colors ${
                    index === breadcrumbItems.length - 1
                      ? 'text-amber-600 font-medium'
                      : 'text-gray-600'
                  }`}
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4" />
                  )}
                  <span>{item.label}</span>
                </Link>
              </div>
            ))}
          </nav>

          {/* Espace pour équilibrer le layout */}
          <div className="w-16"></div>
        </div>
      </div>
    </div>
  );
}
