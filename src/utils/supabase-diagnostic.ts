// Script de diagnostic Supabase
// Utilisez ce script dans la console du navigateur ou dans un composant de test

import { supabase } from '@/lib/supabaseClient';

export async function testSupabaseStorage() {
  console.log('🔍 Test de configuration Supabase Storage...');

  try {
    // 1. Tester la connexion Supabase
    console.log('📡 URL Supabase:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    // 2. Lister les buckets existants
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Erreur lors de la récupération des buckets:', bucketsError);
      return;
    }
    
    console.log('📦 Buckets existants:', buckets?.map(b => b.name) || []);
    
    // 3. Vérifier les buckets requis
    const requiredBuckets = ['histoire', 'legende', 'monument', 'cepages', 'vins', 'domaines', 'appellations', 'typesvin'];
    const existingBuckets = buckets?.map(b => b.name) || [];
    const missingBuckets = requiredBuckets.filter(bucket => !existingBuckets.includes(bucket));
    
    if (missingBuckets.length > 0) {
      console.warn('⚠️ Buckets manquants:', missingBuckets);
      console.log('💡 Exécutez le script create-storage-buckets.sql dans Supabase pour les créer');
    } else {
      console.log('✅ Tous les buckets requis sont présents');
    }
    
    // 4. Test d'upload basique (si au moins un bucket existe)
    if (existingBuckets.length > 0) {
      const testBucket = existingBuckets[0];
      console.log(`🧪 Test d'upload sur le bucket '${testBucket}'...`);
      
      // Créer un fichier de test
      const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const testPath = `test-${Date.now()}.txt`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(testBucket)
        .upload(testPath, testFile);
        
      if (uploadError) {
        console.error('❌ Erreur test upload:', uploadError);
        if (uploadError.message.includes('access')) {
          console.log('💡 Problème de permissions. Vérifiez les politiques RLS dans Supabase Storage.');
        }
      } else {
        console.log('✅ Test upload réussi:', uploadData);
        
        // Nettoyer le fichier de test
        await supabase.storage.from(testBucket).remove([testPath]);
        console.log('🗑️ Fichier de test supprimé');
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

// Instructions d'utilisation
console.log(`
🛠️ DIAGNOSTIC SUPABASE STORAGE

Pour utiliser ce diagnostic :

1. Dans votre composant ou page de test, importez et appelez :
   import { testSupabaseStorage } from '@/utils/supabase-diagnostic';
   testSupabaseStorage();

2. Ou dans la console du navigateur, copiez-collez ce code

3. Les étapes à suivre seront affichées dans la console

📋 SOLUTIONS COMMUNES :

❌ Buckets manquants → Exécutez create-storage-buckets.sql
❌ Erreur de permissions → Configurez les politiques RLS
❌ Erreur de connexion → Vérifiez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
`);
