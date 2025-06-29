'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthService } from '@/lib/authService';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: unknown; error: unknown }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkIsAdmin = useCallback(async () => {
    try {
      const adminStatus = await AuthService.isAdmin();
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error('Erreur lors de la vérification du statut admin:', error);
      setIsAdmin(false);
    }
  }, []);

  const checkUser = useCallback(async () => {
    try {
      const { user } = await AuthService.getCurrentUser();
      setUser(user);
      if (user) {
        await checkIsAdmin();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
    } finally {
      setLoading(false);
    }
  }, [checkIsAdmin]);

  useEffect(() => {
    // Vérifier l'utilisateur actuel au chargement
    checkUser();

    // Écouter les changements d'authentification
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user as User | null);
      if (user) {
        checkIsAdmin();
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [checkUser, checkIsAdmin]);

  const signIn = async (email: string, password: string) => {
    const result = await AuthService.signIn(email, password);
    if (result.data.user) {
      await checkIsAdmin();
    }
    return result;
  };

  const signOut = async () => {
    await AuthService.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
