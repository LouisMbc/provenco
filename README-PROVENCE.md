# 🌻 Provence Authentique

Un site web moderne dédié à la découverte de la Provence, ses villes historiques, ses histoires millénaires, ses légendes fascinantes et ses monuments emblématiques.

## ✨ Fonctionnalités

- **Villes de Provence** : Explorez les villes authentiques avec leurs informations détaillées
- **Histoires** : Plongez dans les récits historiques qui ont façonné la région
- **Légendes** : Découvrez les contes et légendes provençales
- **Monuments** : Admirez le patrimoine architectural (châteaux, églises, fontaines...)
- **Design moderne** : Interface élégante aux couleurs de la Provence
- **Responsive** : Compatible mobile, tablette et desktop

## 🛠️ Technologies

- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique pour plus de robustesse
- **Tailwind CSS** : Styling moderne et responsive
- **Supabase** : Base de données PostgreSQL et authentification
- **Lucide React** : Icônes modernes
- **Heroicons** : Icônes supplémentaires

## 🗄️ Structure de la base de données

Le projet utilise Supabase avec les tables suivantes :

### Table `ville`
- Informations sur les villes provençales (nom, code postal, département, population, coordonnées)

### Table `histoire`
- Récits historiques liés aux villes (titre, contenu, période)

### Table `legende`
- Légendes et contes provençaux (titre, contenu, origine)

### Table `monument`
- Monuments et patrimoine architectural (nom, type, date de construction, description)

### Table `image`
- Images associées aux villes, monuments, histoires et légendes

## 🚀 Installation

1. Clonez le projet :
```bash
git clone <votre-repo>
cd provenco
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez Supabase :
```bash
cp .env.example .env.local
```

Remplissez vos clés Supabase dans `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Créez les tables dans Supabase en exécutant les scripts SQL fournis

5. Lancez le serveur de développement :
```bash
npm run dev
```

6. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📝 Scripts SQL

Créez les tables suivantes dans votre base Supabase :

```sql
-- Table principale : Ville
CREATE TABLE ville (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    code_postal VARCHAR(10),
    departement TEXT,
    region TEXT DEFAULT 'Provence',
    population INTEGER,
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6)
);

-- Table Histoire liée à une ville
CREATE TABLE histoire (
    id SERIAL PRIMARY KEY,
    ville_id INTEGER REFERENCES ville(id) ON DELETE CASCADE,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    periode TEXT
);

-- Table Légende liée à une ville
CREATE TABLE legende (
    id SERIAL PRIMARY KEY,
    ville_id INTEGER REFERENCES ville(id) ON DELETE CASCADE,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    origine TEXT
);

-- Table Monument (églises, châteaux, fontaines...)
CREATE TABLE monument (
    id SERIAL PRIMARY KEY,
    ville_id INTEGER REFERENCES ville(id) ON DELETE CASCADE,
    nom TEXT NOT NULL,
    type TEXT, -- ex: église, abbaye, fontaine...
    date_construction TEXT,
    description TEXT
);

-- Table Image 
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL, -- chemin dans le bucket
    description TEXT,
    ville_id INTEGER REFERENCES ville(id) ON DELETE CASCADE,
    monument_id INTEGER REFERENCES monument(id) ON DELETE CASCADE,
    histoire_id INTEGER REFERENCES histoire(id) ON DELETE CASCADE,
    legende_id INTEGER REFERENCES legende(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Design

Le design s'inspire des couleurs chaudes de la Provence :
- **Couleurs principales** : Ambre, orange, ocre
- **Typographie** : Inter pour le corps de texte, Playfair Display pour les titres
- **Style** : Moderne mais évoquant l'authenticité provençale
- **Iconographie** : Émojis et icônes évoquant la région (🌻, 🏛️, ⛪, 🏰)

## 📱 Pages

- **/** : Page d'accueil avec hero et navigation thématique
- **/villes** : Liste des villes avec filtres par département
- **/villes/[id]** : Page détail d'une ville avec ses histoires, légendes et monuments
- **/histoires** : Collection d'histoires provençales
- **/legendes** : Légendes et contes de la région
- **/monuments** : Patrimoine architectural classé par type

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Proposer de nouvelles fonctionnalités
- Corriger des bugs
- Améliorer la documentation
- Ajouter du contenu sur la Provence

## 📄 Licence

Ce projet est sous licence MIT.
