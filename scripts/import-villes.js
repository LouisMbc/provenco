// scripts/import-villes.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Mapping des codes départements vers noms
const departements = {
  '04': 'Alpes-de-Haute-Provence',
  '05': 'Hautes-Alpes', 
  '06': 'Alpes-Maritimes',
  '13': 'Bouches-du-Rhône',
  '83': 'Var',
  '84': 'Vaucluse'
};

async function importVillesProvence() {
  console.log('🚀 Début de l\'import des villes de Provence...');
  console.log('📡 URL Supabase:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  try {
    for (const [codeDept, nomDept] of Object.entries(departements)) {
      console.log(`📍 Import du département: ${nomDept} (${codeDept})`);
      
      // Appel à l'API Géo
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?codeDepartement=${codeDept}&fields=nom,code,codesPostaux,population,centre&format=json`
      );
      
      if (!response.ok) {
        throw new Error(`Erreur API pour le département ${codeDept}: ${response.status}`);
      }
      
      const communes = await response.json();
      console.log(`  Trouvé ${communes.length} communes`);
      
      // Transformer les données pour Supabase (structure de votre table)
      const villesData = communes
        .filter(commune => commune.population && commune.population > 500) // Filtrer les très petites communes
        .map(commune => ({
          nom: commune.nom,
          code_postal: commune.codesPostaux?.[0] || null,
          departement: nomDept,
          region: 'Provence',
          latitude: commune.centre?.coordinates?.[1] || null,
          longitude: commune.centre?.coordinates?.[0] || null,
          population: commune.population || 0
        }))
        .filter(ville => ville.latitude && ville.longitude); // Garder seulement celles avec coordonnées
      
      console.log(`  ${villesData.length} villes à importer après filtrage`);
      
      // Import par batch de 50 pour éviter les timeouts
      const batchSize = 50;
      let imported = 0;
      
      for (let i = 0; i < villesData.length; i += batchSize) {
        const batch = villesData.slice(i, i + batchSize);
        
        const { error } = await supabase
          .from('ville')
          .insert(batch);
        
        if (error) {
          console.error(`❌ Erreur batch ${i}-${i + batch.length}:`, error);
          throw error;
        } else {
          imported += batch.length;
          console.log(`  ✅ Batch importé: ${imported}/${villesData.length}`);
        }
        
        // Pause pour éviter de surcharger l'API
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log(`✅ ${nomDept}: ${imported} villes importées\n`);
    }
    
    console.log('🎉 Import terminé avec succès !');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erreur durant l\'import:', error);
    process.exit(1);
  }
}

// Lancer l'import
importVillesProvence();