-- Politiques de sécurité pour vos buckets existants
-- À exécuter dans Supabase Dashboard > SQL Editor

-- Politique de lecture publique pour tous vos buckets
CREATE POLICY "Public read access for all buckets" ON storage.objects 
FOR SELECT USING (bucket_id IN ('ville', 'histoire', 'monument', 'legende', 'appellations', 'domaines', 'cepages', 'vins', 'typesvin'));

-- Politique d'upload public pour tous vos buckets (à adapter selon vos besoins)
CREATE POLICY "Public upload access for all buckets" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id IN ('ville', 'histoire', 'monument', 'legende', 'appellations', 'domaines', 'cepages', 'vins', 'typesvin'));

-- Si vous préférez limiter l'upload aux utilisateurs authentifiés :
-- CREATE POLICY "Authenticated upload access for all buckets" ON storage.objects 
-- FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id IN ('ville', 'histoire', 'monument', 'legende', 'appellations', 'domaines', 'cepages', 'vins', 'typesvin'));

-- Politique de mise à jour (optionnelle)
CREATE POLICY "Public update access for all buckets" ON storage.objects 
FOR UPDATE USING (bucket_id IN ('ville', 'histoire', 'monument', 'legende', 'appellations', 'domaines', 'cepages', 'vins', 'typesvin'));

-- Politique de suppression (optionnelle)
CREATE POLICY "Public delete access for all buckets" ON storage.objects 
FOR DELETE USING (bucket_id IN ('ville', 'histoire', 'monument', 'legende', 'appellations', 'domaines', 'cepages', 'vins', 'typesvin'));
