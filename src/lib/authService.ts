import { supabase } from './supabaseClient';

export class AuthService {
  // Connexion
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  // Déconnexion
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  // Récupérer l'utilisateur actuel
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }

  // Récupérer le profil
  static async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  }

  // Vérifier si l'utilisateur est admin
  static async isAdmin() {
    const { user } = await this.getCurrentUser();
    if (!user) return false;
    
    const { data: profile } = await this.getProfile(user.id);
    // Vous pouvez ajouter une logique plus complexe ici
    // Pour l'instant, tout utilisateur connecté est admin
    return !!profile;
  }

  // Écouter les changements d'authentification
  static onAuthStateChange(callback: (user: unknown) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  }
}
