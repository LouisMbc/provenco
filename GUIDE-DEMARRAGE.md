# 🚀 Guide de démarrage rapide - Provence Authentique

## Étapes d'installation

### 1. Configuration de Supabase

1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Dans l'onglet SQL Editor, exécutez le script suivant pour créer les tables :

```sql
-- Copiez le contenu des tables SQL depuis votre schéma de base de données
-- Voir le fichier README-PROVENCE.md pour le script complet
```

4. Optionnel : Ajoutez des données d'exemple en exécutant le fichier `sample-data.sql`

### 2. Configuration des variables d'environnement

1. Copiez le fichier d'exemple :
```bash
cp .env.example .env.local
```

2. Remplissez vos clés Supabase dans `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anonyme
```

### 3. Installation et lancement

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── villes/            # Pages des villes
│   ├── histoires/         # Pages des histoires
│   ├── legendes/          # Pages des légendes
│   └── monuments/         # Pages des monuments
├── components/            # Composants réutilisables
│   ├── Header.tsx        # En-tête avec navigation
│   ├── Footer.tsx        # Pied de page
│   └── VilleCard.tsx     # Carte d'une ville
├── lib/                  # Utilitaires et services
│   ├── supabaseClient.js # Configuration Supabase
│   └── supabaseService.ts # Service d'accès aux données
└── types/                # Types TypeScript
    └── database.ts       # Types pour la base de données
```

## Fonctionnalités principales

- **Page d'accueil** : Hero section et navigation thématique
- **Villes** : Liste et détail des villes provençales
- **Histoires** : Collection de récits historiques
- **Légendes** : Contes et légendes de Provence
- **Monuments** : Patrimoine architectural

## Personnalisation

### Couleurs
Le thème utilise les couleurs de la Provence (ambre, orange, ocre). 
Modifiez les couleurs dans `src/app/globals.css`.

### Contenu
Ajoutez vos propres données via l'interface Supabase ou en modifiant le fichier `sample-data.sql`.

## Déploiement

### Vercel (recommandé)
1. Connectez votre repository GitHub à Vercel
2. Ajoutez vos variables d'environnement dans les settings Vercel
3. Déployez automatiquement à chaque push

### Autres plateformes
Le projet est compatible avec toutes les plateformes supportant Next.js :
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Support

Pour toute question ou suggestion :
- Ouvrez une issue sur GitHub
- Consultez la documentation Next.js
- Consultez la documentation Supabase
