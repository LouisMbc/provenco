import { supabase } from './supabaseClient';
import { Ville, VilleWithRelations, Histoire, Legende, Monument, Image, Vin, Appellation, Cepage, Domaine, TypeVin } from '@/types/database';

export class SupabaseService {
  // Villes
  static async getVilles(): Promise<Ville[]> {
    const { data, error } = await supabase
      .from('ville')
      .select('*')
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async getVilleById(id: number): Promise<VilleWithRelations | null> {
    const { data, error } = await supabase
      .from('ville')
      .select(`
        *,
        histoires:histoire(*),
        legendes:legende(*),
        monuments:monument(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getVillesByDepartement(departement: string): Promise<Ville[]> {
    const { data, error } = await supabase
      .from('ville')
      .select('*')
      .eq('departement', departement)
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  // Histoires
  static async getHistoires(): Promise<Histoire[]> {
    const { data, error } = await supabase
      .from('histoire')
      .select(`
        *,
        ville:ville(*)
      `)
      .order('id', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async getHistoiresByVille(villeId: number): Promise<Histoire[]> {
    const { data, error } = await supabase
      .from('histoire')
      .select('*')
      .eq('ville_id', villeId);
    
    if (error) throw error;
    return data || [];
  }

  static async getHistoireById(id: number): Promise<Histoire | null> {
    const { data, error } = await supabase
      .from('histoire')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  // Légendes
  static async getLegendes(): Promise<Legende[]> {
    const { data, error } = await supabase
      .from('legende')
      .select(`
        *,
        ville:ville(*)
      `)
      .order('id', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async getLegendesByVille(villeId: number): Promise<Legende[]> {
    const { data, error } = await supabase
      .from('legende')
      .select('*')
      .eq('ville_id', villeId);
    
    if (error) throw error;
    return data || [];
  }

  static async getLegendeById(id: number): Promise<Legende | null> {
    const { data, error } = await supabase
      .from('legende')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  // Monuments
  static async getMonuments(): Promise<Monument[]> {
    const { data, error } = await supabase
      .from('monument')
      .select(`
        *,
        ville:ville(*)
      `)
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async getMonumentsByVille(villeId: number): Promise<Monument[]> {
    const { data, error } = await supabase
      .from('monument')
      .select('*')
      .eq('ville_id', villeId);
    
    if (error) throw error;
    return data || [];
  }

  static async getMonumentsByType(type: string): Promise<Monument[]> {
    const { data, error } = await supabase
      .from('monument')
      .select(`
        *,
        ville:ville(*)
      `)
      .eq('type', type)
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async getMonumentById(id: number): Promise<Monument | null> {
    const { data, error } = await supabase
      .from('monument')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  // Images
  static async getImagesByVille(villeId: number): Promise<Image[]> {
    const { data, error } = await supabase
      .from('image')
      .select('*')
      .eq('ville_id', villeId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async getImagesByMonument(monumentId: number): Promise<Image[]> {
    const { data, error } = await supabase
      .from('image')
      .select('*')
      .eq('monument_id', monumentId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  // Recherche
  static async searchVilles(query: string): Promise<Ville[]> {
    const { data, error } = await supabase
      .from('ville')
      .select('*')
      .or(`nom.ilike.%${query}%,departement.ilike.%${query}%`)
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async searchContent(query: string) {
    const [villes, histoires, legendes, monuments] = await Promise.all([
      supabase
        .from('ville')
        .select('*')
        .or(`nom.ilike.%${query}%,departement.ilike.%${query}%`)
        .limit(5),
      supabase
        .from('histoire')
        .select(`*, ville:ville(*)`)
        .or(`titre.ilike.%${query}%,contenu.ilike.%${query}%`)
        .limit(5),
      supabase
        .from('legende')
        .select(`*, ville:ville(*)`)
        .or(`titre.ilike.%${query}%,contenu.ilike.%${query}%`)
        .limit(5),
      supabase
        .from('monument')
        .select(`*, ville:ville(*)`)
        .or(`nom.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(5)
    ]);

    return {
      villes: villes.data || [],
      histoires: histoires.data || [],
      legendes: legendes.data || [],
      monuments: monuments.data || []
    };
  }

  // ===============================
  // MÉTHODES CRUD POUR L'ADMIN
  // ===============================
  
  // VILLES - CRUD
  static async createVille(ville: Omit<Ville, 'id'>) {
    const { data, error } = await supabase
      .from('ville')
      .insert([ville])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateVille(id: number, updates: Partial<Ville>) {
    const { data, error } = await supabase
      .from('ville')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteVille(id: number) {
    const { error } = await supabase
      .from('ville')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // HISTOIRES - CRUD
  static async createHistoire(histoire: Omit<Histoire, 'id'>) {
    const { data, error } = await supabase
      .from('histoire')
      .insert([histoire])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateHistoire(id: number, updates: Partial<Histoire>) {
    const { data, error } = await supabase
      .from('histoire')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteHistoire(id: number) {
    const { error } = await supabase
      .from('histoire')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // LÉGENDES - CRUD
  static async createLegende(legende: Omit<Legende, 'id'>) {
    const { data, error } = await supabase
      .from('legende')
      .insert([legende])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateLegende(id: number, updates: Partial<Legende>) {
    const { data, error } = await supabase
      .from('legende')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteLegende(id: number) {
    const { error } = await supabase
      .from('legende')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // MONUMENTS - CRUD
  static async createMonument(monument: Omit<Monument, 'id'>) {
    const { data, error } = await supabase
      .from('monument')
      .insert([monument])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateMonument(id: number, updates: Partial<Monument>) {
    const { data, error } = await supabase
      .from('monument')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteMonument(id: number) {
    const { error } = await supabase
      .from('monument')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // IMAGES - CRUD
  static async createImage(image: Omit<Image, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('image')
      .insert([image])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteImage(id: number) {
    const { error } = await supabase
      .from('image')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // VINS - CRUD
  static async getVins(): Promise<Vin[]> {
    const { data, error } = await supabase
      .from('vin')
      .select(`
        *,
        appellation:appellation(*),
        domaine:domaine(*),
        type_vin:type_vin(*)
      `)
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async getVinById(id: number): Promise<Vin | null> {
    const { data, error } = await supabase
      .from('vin')
      .select(`
        *,
        appellation:appellation(*),
        domaine:domaine(*),
        type_vin:type_vin(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async createVin(vin: Omit<Vin, 'id'>) {
    const { data, error } = await supabase
      .from('vin')
      .insert([vin])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateVin(id: number, updates: Partial<Vin>) {
    const { data, error } = await supabase
      .from('vin')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteVin(id: number) {
    const { error } = await supabase
      .from('vin')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // APPELLATIONS - CRUD
  static async getAppellations(): Promise<Appellation[]> {
    const { data, error } = await supabase
      .from('appellation')
      .select('*')
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async getAppellationById(id: number): Promise<Appellation | null> {
    const { data, error } = await supabase
      .from('appellation')
      .select(`
        *,
        domaines:domaine(*),
        vins:vin(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async createAppellation(appellation: Omit<Appellation, 'id'>) {
    const { data, error } = await supabase
      .from('appellation')
      .insert([appellation])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateAppellation(id: number, updates: Partial<Appellation>) {
    const { data, error } = await supabase
      .from('appellation')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteAppellation(id: number) {
    const { error } = await supabase
      .from('appellation')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // CÉPAGES - CRUD
  static async getCepages(): Promise<Cepage[]> {
    const { data, error } = await supabase
      .from('cepage')
      .select('*')
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async getCepageById(id: number): Promise<Cepage | null> {
    const { data, error } = await supabase
      .from('cepage')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async createCepage(cepage: Omit<Cepage, 'id'>) {
    const { data, error } = await supabase
      .from('cepage')
      .insert([cepage])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateCepage(id: number, updates: Partial<Cepage>) {
    const { data, error } = await supabase
      .from('cepage')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteCepage(id: number) {
    const { error } = await supabase
      .from('cepage')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // DOMAINES - CRUD
  static async getDomaines(): Promise<Domaine[]> {
    const { data, error } = await supabase
      .from('domaine')
      .select(`
        *,
        ville:ville(*),
        appellation:appellation(*)
      `)
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async getDomaineById(id: number): Promise<Domaine | null> {
    const { data, error } = await supabase
      .from('domaine')
      .select(`
        *,
        ville:ville(*),
        appellation:appellation(*),
        vins:vin(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async createDomaine(domaine: Omit<Domaine, 'id'>) {
    const { data, error } = await supabase
      .from('domaine')
      .insert([domaine])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateDomaine(id: number, updates: Partial<Domaine>) {
    const { data, error } = await supabase
      .from('domaine')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteDomaine(id: number) {
    const { error } = await supabase
      .from('domaine')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // TYPES DE VIN - CRUD
  static async getTypesVin(): Promise<TypeVin[]> {
    const { data, error } = await supabase
      .from('type_vin')
      .select('*')
      .order('nom');
    
    if (error) throw error;
    return data || [];
  }

  static async getTypeVinById(id: number): Promise<TypeVin | null> {
    const { data, error } = await supabase
      .from('type_vin')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async createTypeVin(typeVin: Omit<TypeVin, 'id'>) {
    const { data, error } = await supabase
      .from('type_vin')
      .insert([typeVin])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateTypeVin(id: number, updates: Partial<TypeVin>) {
    const { data, error } = await supabase
      .from('type_vin')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteTypeVin(id: number) {
    const { error } = await supabase
      .from('type_vin')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}
