'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CookieService } from '@/lib/cookieService';
import CookiePolicyModal from './CookiePolicyModal';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    // et si le consentement n'a pas expiré
    if (!CookieService.hasConsent() || CookieService.isConsentExpired()) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    CookieService.acceptAll();
    setShowBanner(false);
  };

  const declineNonEssential = () => {
    CookieService.declineNonEssential();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-amber-200 shadow-2xl z-50">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                🍪 Utilisation des cookies
              </h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                Ce site utilise des cookies essentiels pour votre authentification et navigation. 
                Nous utilisons <strong>Supabase</strong> pour sécuriser vos données. 
                Aucun cookie de suivi publicitaire n&apos;est utilisé.
              </p>
              <div className="mt-2">
                <button 
                  className="text-xs text-amber-600 hover:text-amber-800 underline"
                  onClick={() => setShowPolicyModal(true)}
                >
                  En savoir plus sur notre politique de cookies
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 min-w-fit">
              <button
                onClick={declineNonEssential}
                className="px-4 py-2 border border-amber-300 text-amber-700 rounded-md hover:bg-amber-50 text-sm font-medium transition-colors"
              >
                Refuser non-essentiels
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md hover:from-amber-700 hover:to-orange-700 text-sm font-medium transition-all"
              >
                Accepter tous
              </button>
            </div>
            
            <button
              onClick={declineNonEssential}
              className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 p-1 text-amber-400 hover:text-amber-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de politique de cookies */}
      <CookiePolicyModal 
        isOpen={showPolicyModal} 
        onClose={() => setShowPolicyModal(false)} 
      />
    </>
  );
}
