/**
 * Service de gestion des cookies et préférences utilisateur
 * Respecte les bonnes pratiques RGPD
 */

export interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export class CookieService {
  private static readonly CONSENT_KEY = 'cookie-consent';
  private static readonly PREFERENCES_KEY = 'cookie-preferences';
  private static readonly CONSENT_DATE_KEY = 'cookie-consent-date';

  /**
   * Vérifier si l'utilisateur a donné son consentement
   */
  static hasConsent(): boolean {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem(this.CONSENT_KEY);
    return consent === 'accepted';
  }

  /**
   * Obtenir les préférences de cookies
   */
  static getPreferences(): CookiePreferences {
    if (typeof window === 'undefined') {
      return { essential: true, functional: false, analytics: false, marketing: false };
    }

    const stored = localStorage.getItem(this.PREFERENCES_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Si erreur de parsing, retourner les valeurs par défaut
      }
    }

    // Valeurs par défaut (seuls les essentiels acceptés)
    return {
      essential: true, // Toujours true (nécessaire pour le fonctionnement)
      functional: false,
      analytics: false,
      marketing: false
    };
  }

  /**
   * Enregistrer les préférences de cookies
   */
  static setPreferences(preferences: CookiePreferences): void {
    if (typeof window === 'undefined') return;

    // S'assurer que les cookies essentiels sont toujours activés
    const safePreferences = {
      ...preferences,
      essential: true
    };

    localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(safePreferences));
    localStorage.setItem(this.CONSENT_KEY, 'accepted');
    localStorage.setItem(this.CONSENT_DATE_KEY, new Date().toISOString());
    
    // Déclencher un événement personnalisé pour informer les autres composants
    window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', { 
      detail: safePreferences 
    }));
  }

  /**
   * Accepter tous les cookies
   */
  static acceptAll(): void {
    this.setPreferences({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    });
  }

  /**
   * Refuser les cookies non-essentiels
   */
  static declineNonEssential(): void {
    this.setPreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    });
  }

  /**
   * Révoquer le consentement
   */
  static revokeConsent(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.CONSENT_KEY);
    localStorage.removeItem(this.PREFERENCES_KEY);
    localStorage.removeItem(this.CONSENT_DATE_KEY);

    // Nettoyer les cookies non-essentiels
    this.clearNonEssentialCookies();
    
    window.dispatchEvent(new CustomEvent('cookieConsentRevoked'));
  }

  /**
   * Obtenir la date de consentement
   */
  static getConsentDate(): Date | null {
    if (typeof window === 'undefined') return null;
    
    const dateStr = localStorage.getItem(this.CONSENT_DATE_KEY);
    return dateStr ? new Date(dateStr) : null;
  }

  /**
   * Vérifier si le consentement a expiré (après 13 mois selon RGPD)
   */
  static isConsentExpired(): boolean {
    const consentDate = this.getConsentDate();
    if (!consentDate) return true;

    const thirteenMonthsAgo = new Date();
    thirteenMonthsAgo.setMonth(thirteenMonthsAgo.getMonth() - 13);
    
    return consentDate < thirteenMonthsAgo;
  }

  /**
   * Nettoyer les cookies non-essentiels
   */
  private static clearNonEssentialCookies(): void {
    if (typeof document === 'undefined') return;

    // Liste des cookies à préserver (Supabase + essentiels)
    const essentialCookies = [
      'sb-access-token',
      'sb-refresh-token', 
      'sb-auth-token',
      this.CONSENT_KEY,
      this.PREFERENCES_KEY,
      this.CONSENT_DATE_KEY
    ];

    // Obtenir tous les cookies
    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      
      // Si ce n'est pas un cookie essentiel, le supprimer
      if (!essentialCookies.some(essential => cookieName.startsWith(essential))) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      }
    });
  }

  /**
   * Vérifier si on peut utiliser un type de cookie spécifique
   */
  static canUseCookie(type: keyof CookiePreferences): boolean {
    const preferences = this.getPreferences();
    return preferences[type];
  }

  /**
   * Obtenir des informations sur les cookies utilisés
   */
  static getCookieInfo() {
    return {
      essential: [
        {
          name: 'Cookies d\'authentification Supabase',
          purpose: 'Maintenir votre session de connexion',
          duration: 'Session + 1 semaine',
          cookies: ['sb-access-token', 'sb-refresh-token', 'sb-auth-token']
        },
        {
          name: 'Préférences de cookies',
          purpose: 'Mémoriser vos choix de cookies',
          duration: '13 mois',
          cookies: [this.CONSENT_KEY, this.PREFERENCES_KEY, this.CONSENT_DATE_KEY]
        }
      ],
      functional: [
        {
          name: 'Préférences utilisateur',
          purpose: 'Mémoriser vos préférences de navigation',
          duration: '1 an',
          cookies: ['user-preferences']
        }
      ],
      analytics: [
        {
          name: 'Analytics (non implémenté)',
          purpose: 'Analyser l\'utilisation du site de manière anonyme',
          duration: '2 ans',
          cookies: []
        }
      ],
      marketing: [
        {
          name: 'Marketing (non implémenté)', 
          purpose: 'Personnaliser le contenu',
          duration: '1 an',
          cookies: []
        }
      ]
    };
  }
}
