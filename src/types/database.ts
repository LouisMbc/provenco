export interface Ville {
  id: number;
  nom: string;
  code_postal?: string;
  departement?: string;
  region?: string;
  population?: number;
  latitude?: number;
  longitude?: number;
}

export interface Histoire {
  id: number;
  ville_id: number;
  titre: string;
  contenu: string;
  periode?: string;
  ville?: Ville;
}

export interface Legende {
  id: number;
  ville_id: number;
  titre: string;
  contenu: string;
  origine?: string;
  ville?: Ville;
}

export interface Monument {
  id: number;
  ville_id: number;
  nom: string;
  type?: string;
  date_construction?: string;
  description?: string;
  ville?: Ville;
}

export interface Image {
  id: number;
  url: string;
  description?: string;
  ville_id?: number;
  monument_id?: number;
  histoire_id?: number;
  legende_id?: number;
  created_at?: string;
}

export interface VilleWithRelations extends Ville {
  histoires?: Histoire[];
  legendes?: Legende[];
  monuments?: Monument[];
  images?: Image[];
}

// Types pour les vins de Provence
export interface TypeVin {
  id: string;
  nom: string;
}

export interface Appellation {
  id: string;
  nom: string;
  description?: string;
  region?: string;
  domaines?: Domaine[];
  vins?: Vin[];
  cepages?: Cepage[];
}

export interface Domaine {
  id: string;
  nom: string;
  description?: string;
  localisation?: string;
  site_web?: string;
  appellation?: Appellation;
  vins?: Vin[];
  cepages?: Cepage[];
}

export interface Cepage {
  id: string;
  nom: string;
  description?: string;
  vins?: Vin[];
  appellations?: Appellation[];
  domaines?: Domaine[];
}

export interface Vin {
  id: string;
  nom: string;
  annee?: number;
  description?: string;
  domaine_id?: string;
  appellation_id?: string;
  type_vin_id?: string;
  domaine?: Domaine;
  appellation?: Appellation;
  type_vin?: TypeVin;
  cepages?: Cepage[];
}

export interface VinCepage {
  vin_id: string;
  cepage_id: string;
}
