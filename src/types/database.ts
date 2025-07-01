export interface Ville {
  id: number;
  nom: string;
  code_postal?: string;
  departement?: string;
  region?: string;
  population?: number;
  latitude?: number;
  longitude?: number;
  image_url?: string;
}

export interface Histoire {
  id: number;
  ville_id: number;
  titre: string;
  contenu: string;
  periode?: string;
  image_url?: string;
  image_alt?: string;
  image_caption?: string;
  ville?: Ville;
}

export interface Legende {
  id: number;
  ville_id: number;
  titre: string;
  contenu: string;
  origine?: string;
  image_url?: string;
  image_alt?: string;
  image_caption?: string;
  ville?: Ville;
}

export interface Monument {
  id: number;
  ville_id: number;
  nom: string;
  type?: string;
  date_construction?: string;
  description?: string;
  image_url?: string;
  image_alt?: string;
  image_caption?: string;
  ville?: Ville;
}

export interface Vin {
  id: number;
  nom: string;
  appellation_id?: number;
  domaine_id?: number;
  type_vin_id?: number;
  annee?: number;
  description?: string;
  prix?: number;
  image_url?: string;
  appellation?: Appellation;
  domaine?: Domaine;
  type_vin?: TypeVin;
  cepages?: Cepage[];
}

export interface Appellation {
  id: number;
  nom: string;
  region?: string;
  description?: string;
  image_url?: string;
  domaines?: Domaine[];
  vins?: Vin[];
}

export interface Cepage {
  id: number;
  nom: string;
  couleur: 'rouge' | 'blanc' | 'rosé';
  description?: string;
  image_url?: string;
  vins?: Vin[];
  appellations?: Appellation[];
  domaines?: Domaine[];
}

export interface TypeVin {
  id: number;
  nom: string;
  description?: string;
  image_url?: string;
}

export interface Domaine {
  id: number;
  nom: string;
  ville_id?: number;
  adresse?: string;
  description?: string;
  image_url?: string;
  ville?: Ville;
  appellation_id?: number;
  appellation?: Appellation;
  vins?: Vin[];
  cepages?: Cepage[];
}

export interface Image {
  id: number;
  url: string;
  description?: string;
  ville_id?: number;
  monument_id?: number;
  histoire_id?: number;
  legende_id?: number;
  vin_id?: number;
  appellation_id?: number;
  cepage_id?: number;
  domaine_id?: number;
  created_at?: string;
}

export interface VilleWithRelations extends Ville {
  histoires?: Histoire[];
  legendes?: Legende[];
  monuments?: Monument[];
  images?: Image[];
}

// Tables de liaison pour les relations many-to-many
export interface VinCepage {
  vin_id: number;
  cepage_id: number;
}

export interface AppellationCepage {
  appellation_id: number;
  cepage_id: number;
}

export interface DomaineCepage {
  domaine_id: number;
  cepage_id: number;
}
