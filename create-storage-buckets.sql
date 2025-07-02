-- Script SQL pour créer les buckets de stockage Supabase
-- À exécuter dans le dashboard Supabase > Storage

-- Créer les buckets s'ils n'existent pas
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('histoire', 'histoire', true),
  ('legende', 'legende', true),
  ('monument', 'monument', true),
  ('cepages', 'cepages', true),
  ('vins', 'vins', true),
  ('domaines', 'domaines', true),
  ('appellations', 'appellations', true),
  ('typesvin', 'typesvin', true)
ON CONFLICT (id) DO NOTHING;

-- Politique d'accès publique pour la lecture
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id IN ('histoire', 'legende', 'monument', 'cepages', 'vins', 'domaines', 'appellations', 'typesvin'));

-- Politique d'écriture pour les utilisateurs authentifiés (optionnel)
CREATE POLICY "Authenticated upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('histoire', 'legende', 'monument', 'cepages', 'vins', 'domaines', 'appellations', 'typesvin'));
