-- Migration pour ajouter les colonnes manquantes à la table ville
-- Date: 2025-06-30

-- Ajouter la colonne code si elle n'existe pas
ALTER TABLE ville ADD COLUMN IF NOT EXISTS code VARCHAR(5) UNIQUE;

-- Ajouter les autres colonnes nécessaires
ALTER TABLE ville ADD COLUMN IF NOT EXISTS region VARCHAR(100);
ALTER TABLE ville ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);
ALTER TABLE ville ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);
ALTER TABLE ville ADD COLUMN IF NOT EXISTS population INTEGER;
ALTER TABLE ville ADD COLUMN IF NOT EXISTS surface DECIMAL(10, 2);

-- Créer un index sur le code pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_ville_code ON ville(code);
CREATE INDEX IF NOT EXISTS idx_ville_coordinates ON ville(latitude, longitude);

-- Commentaires pour documentation
COMMENT ON COLUMN ville.code IS 'Code INSEE de la commune';
COMMENT ON COLUMN ville.region IS 'Région administrative';
COMMENT ON COLUMN ville.latitude IS 'Latitude en degrés décimaux';
COMMENT ON COLUMN ville.longitude IS 'Longitude en degrés décimaux';
COMMENT ON COLUMN ville.population IS 'Population municipale';
COMMENT ON COLUMN ville.surface IS 'Surface en km²';
