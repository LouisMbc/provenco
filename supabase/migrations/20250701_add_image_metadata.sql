-- Migration pour ajouter les colonnes d'images manquantes
-- Date: 2025-07-01

-- Ajouter les colonnes image_alt et image_caption à toutes les tables de contenu
ALTER TABLE histoire ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE histoire ADD COLUMN IF NOT EXISTS image_caption TEXT;

ALTER TABLE legende ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE legende ADD COLUMN IF NOT EXISTS image_caption TEXT;

ALTER TABLE monument ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE monument ADD COLUMN IF NOT EXISTS image_caption TEXT;

ALTER TABLE ville ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE ville ADD COLUMN IF NOT EXISTS image_caption TEXT;

-- Ajouter les colonnes aux nouvelles tables
ALTER TABLE vins ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE vins ADD COLUMN IF NOT EXISTS image_caption TEXT;

ALTER TABLE appellations ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE appellations ADD COLUMN IF NOT EXISTS image_caption TEXT;

ALTER TABLE cepages ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE cepages ADD COLUMN IF NOT EXISTS image_caption TEXT;

ALTER TABLE domaines ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE domaines ADD COLUMN IF NOT EXISTS image_caption TEXT;

ALTER TABLE typesvin ADD COLUMN IF NOT EXISTS image_alt VARCHAR(255);
ALTER TABLE typesvin ADD COLUMN IF NOT EXISTS image_caption TEXT;

-- Commentaires pour documentation
COMMENT ON COLUMN histoire.image_alt IS 'Texte alternatif pour l''image';
COMMENT ON COLUMN histoire.image_caption IS 'Légende de l''image';

COMMENT ON COLUMN legende.image_alt IS 'Texte alternatif pour l''image';
COMMENT ON COLUMN legende.image_caption IS 'Légende de l''image';

COMMENT ON COLUMN monument.image_alt IS 'Texte alternatif pour l''image';
COMMENT ON COLUMN monument.image_caption IS 'Légende de l''image';

COMMENT ON COLUMN ville.image_alt IS 'Texte alternatif pour l''image';
COMMENT ON COLUMN ville.image_caption IS 'Légende de l''image';
