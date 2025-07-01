-- Script SQL pour créer les buckets de stockage Supabase
-- À exécuter dans le dashboard Supabase > Storage

-- Créer les buckets s'ils n'existent pas
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('histoire', 'histoire', true),
  ('legende', 'legende', true),
  ('monument', 'monument', true),
  ('cepage', 'cepage', true),
  ('vin', 'vin', true),
  ('domaine', 'domaine', true),
  ('appellation', 'appellation', true),
  ('content', 'content', true)
ON CONFLICT (id) DO NOTHING;

-- Politique d'accès publique pour la lecture
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id IN ('histoire', 'legende', 'monument', 'cepage', 'vin', 'domaine', 'appellation', 'content'));

-- Politique d'écriture pour les utilisateurs authentifiés (optionnel)
CREATE POLICY "Authenticated upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('histoire', 'legende', 'monument', 'cepage', 'vin', 'domaine', 'appellation', 'content'));
