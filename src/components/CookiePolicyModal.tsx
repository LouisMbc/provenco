'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { CookieService } from '@/lib/cookieService';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiePolicyModal({ isOpen, onClose }: CookiePolicyModalProps) {
  const preferences = CookieService.getPreferences();

  if (!isOpen) return null;

  const handleSavePreferences = () => {
    // Garder les préférences actuelles (seuls les essentiels sont utilisés)
    CookieService.setPreferences(preferences);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900 font-playfair">
            🍪 Politique de cookies
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-amber-400 hover:text-amber-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Introduction */}
            <section>
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                Notre engagement de transparence
              </h3>
              <p className="text-amber-700 leading-relaxed">
                <strong>Provence Authentique</strong> respecte votre vie privée. Ce site utilise uniquement des cookies 
                essentiels pour son bon fonctionnement. <strong>Aucune donnée personnelle n&apos;est collectée</strong> 
                et <strong>aucun suivi publicitaire n&apos;est effectué</strong>.
              </p>
            </section>

            {/* Cookies essentiels */}
            <section className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                ✅ Cookies essentiels (obligatoires)
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border border-green-100">
                  <h4 className="font-medium text-green-800">Authentification administrateur</h4>
                  <p className="text-sm text-green-700 mt-1">
                    <strong>Finalité :</strong> Permettre aux administrateurs de se connecter pour gérer le contenu du site.
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Cookies :</strong> sb-access-token, sb-refresh-token, sb-auth-token
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Durée :</strong> Session + 7 jours maximum
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Fournisseur :</strong> Supabase (service d&apos;authentification sécurisé)
                  </p>
                </div>

                <div className="bg-white p-3 rounded border border-green-100">
                  <h4 className="font-medium text-green-800">Préférences de cookies</h4>
                  <p className="text-sm text-green-700 mt-1">
                    <strong>Finalité :</strong> Mémoriser vos choix concernant cette bannière de cookies.
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Cookies :</strong> cookie-consent, cookie-preferences
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Durée :</strong> 13 mois (conforme RGPD)
                  </p>
                </div>
              </div>
            </section>

            {/* Ce que nous ne faisons PAS */}
            <section className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                🚫 Ce que nous NE faisons PAS
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Tracking publicitaire ou marketing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Collecte de données personnelles des visiteurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Partage de données avec des tiers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Profilage comportemental</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Cookies de réseaux sociaux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Google Analytics ou autres outils de mesure d&apos;audience</span>
                </li>
              </ul>
            </section>

            {/* Vos droits */}
            <section>
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                Vos droits et contrôles
              </h3>
              <div className="space-y-3 text-amber-700">
                <p>
                  <strong>🔧 Gestion des cookies :</strong> Vous pouvez refuser les cookies non-essentiels 
                  (bien qu&apos;il n&apos;y en ait actuellement aucun) et modifier vos préférences à tout moment.
                </p>
                <p>
                  <strong>🗑️ Suppression :</strong> Vous pouvez supprimer tous les cookies via les paramètres 
                  de votre navigateur.
                </p>
                <p>
                  <strong>⏰ Expiration :</strong> Votre consentement expire automatiquement après 13 mois.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Questions ?
              </h3>
              <p className="text-amber-700">
                Si vous avez des questions sur notre utilisation des cookies, 
                cette politique sera mise à jour pour refléter tout changement futur.
              </p>
            </section>

            {/* Gérer les préférences */}
            <section className="border-t border-amber-200 pt-4">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">
                Gérer vos préférences
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-medium text-gray-900">Cookies essentiels</h4>
                    <p className="text-sm text-gray-600">Nécessaires au fonctionnement du site</p>
                  </div>
                  <div className="text-green-600 font-medium">Toujours activés</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded opacity-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Cookies fonctionnels</h4>
                    <p className="text-sm text-gray-600">Actuellement non utilisés</p>
                  </div>
                  <div className="text-gray-500">Non disponibles</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded opacity-50">
                  <div>
                    <h4 className="font-medium text-gray-900">Cookies analytiques</h4>
                    <p className="text-sm text-gray-600">Actuellement non utilisés</p>
                  </div>
                  <div className="text-gray-500">Non disponibles</div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-amber-200 bg-amber-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-amber-300 text-amber-700 rounded-md hover:bg-amber-100 transition-colors"
          >
            Fermer
          </button>
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md hover:from-amber-700 hover:to-orange-700 transition-all"
          >
            Sauvegarder les préférences
          </button>
        </div>
      </div>
    </div>
  );
}
