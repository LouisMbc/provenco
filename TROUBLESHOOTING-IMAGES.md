# 🛠️ Guide de Dépannage - Upload d'Images

## 🚨 Problème : Erreur upload `{}`

### Causes possibles et solutions :

### 1. 📦 Buckets Supabase manquants

**Symptôme :** Erreur vide `{}` ou message "bucket not found"

**Solution :**
1. Allez dans votre dashboard Supabase > Storage
2. Exécutez le script SQL suivant dans l'éditeur SQL :

```sql
-- Créer les buckets manquants
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
```

### 2. 🔒 Politiques de sécurité (RLS) manquantes

**Symptôme :** Erreur "access denied" ou "permission denied"

**Solution :**
1. Dans Supabase > Storage > Policies
2. Ajoutez ces politiques :

```sql
-- Lecture publique pour tous
CREATE POLICY "Public read access" ON storage.objects 
FOR SELECT USING (bucket_id IN ('ville', 'histoire', 'legende', 'monument', 'appellations', 'domaines', 'cepages', 'vins', 'typesvin'));

-- Upload pour tous (ou seulement authentifiés selon vos besoins)
CREATE POLICY "Public upload access" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id IN ('ville', 'histoire', 'legende', 'monument', 'appellations', 'domaines', 'cepages', 'vins', 'typesvin'));
```

### 3. 🌐 Variables d'environnement

**Symptôme :** Erreur de connexion ou "invalid project"

**Solution :**
Vérifiez votre fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anonyme
```

### 4. 📂 Taille de fichier ou format

**Symptôme :** Upload qui échoue silencieusement

**Solution :**
- Vérifiez que l'image fait moins de 50MB
- Formats supportés : JPG, PNG, GIF, WebP, SVG

---

## 🧪 Test rapide

1. Allez sur `/test-simple-editor`
2. Cliquez sur "🔍 Diagnostiquer Supabase Storage"
3. Consultez la console du navigateur (F12)
4. Suivez les recommandations affichées

---

## ✅ Vérification complète

### Dashboard Supabase :

1. **Storage > Buckets** : Vérifiez que tous les buckets existent
   - `histoire`, `legende`, `monument`, `cepage`, `vin`, `domaine`, `appellation`, `content`

2. **Storage > Policies** : Vérifiez les politiques d'accès
   - Au minimum une politique SELECT publique
   - Une politique INSERT (publique ou authentifiée)

3. **Settings > API** : Copiez les bonnes clés dans `.env.local`

### Test manuel :

1. Dans le dashboard Supabase > Storage
2. Sélectionnez un bucket (ex: `content`)
3. Uploadez manuellement une image
4. Vérifiez que l'URL publique fonctionne

---

## 🎨 Intégration des images dans le texte

Les images sont automatiquement stylées pour :
- Se redimensionner à la largeur du conteneur
- Avoir des coins arrondis et une ombre
- Être centrées dans le texte
- Avoir un effet hover élégant

### Styles appliqués :
- `max-width: 100%` - Responsive
- `margin: 1.5rem auto` - Espacement et centrage
- `border-radius: 12px` - Coins arrondis
- `box-shadow` - Ombre portée
- `transition` - Animations fluides

---

## 🆘 Si rien ne fonctionne

1. **Redémarrez le serveur de dev** : `npm run dev`
2. **Videz le cache du navigateur** : Ctrl+F5
3. **Vérifiez la console réseau** dans F12 > Network
4. **Testez avec un autre navigateur**
5. **Vérifiez les CORS** dans Supabase > Settings > API

---

## 📞 Support

Si le problème persiste :
1. Copiez l'erreur complète de la console
2. Vérifiez les politiques RLS dans Supabase
3. Testez l'upload directement dans le dashboard Supabase
