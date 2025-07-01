-- Script pour recréer les tables de base
-- Date: 2025-07-01

-- Créer la table ville
CREATE TABLE IF NOT EXISTS ville (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    code_postal VARCHAR(10),
    departement VARCHAR(100),
    region VARCHAR(100),
    population INTEGER,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer la table histoire
CREATE TABLE IF NOT EXISTS histoire (
    id SERIAL PRIMARY KEY,
    ville_id INTEGER REFERENCES ville(id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    periode VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer la table legende
CREATE TABLE IF NOT EXISTS legende (
    id SERIAL PRIMARY KEY,
    ville_id INTEGER REFERENCES ville(id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    origine VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer la table monument
CREATE TABLE IF NOT EXISTS monument (
    id SERIAL PRIMARY KEY,
    ville_id INTEGER REFERENCES ville(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    date_construction VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les index pour les performances
CREATE INDEX IF NOT EXISTS idx_ville_nom ON ville(nom);
CREATE INDEX IF NOT EXISTS idx_ville_departement ON ville(departement);
CREATE INDEX IF NOT EXISTS idx_ville_coordinates ON ville(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_histoire_ville_id ON histoire(ville_id);
CREATE INDEX IF NOT EXISTS idx_legende_ville_id ON legende(ville_id);
CREATE INDEX IF NOT EXISTS idx_monument_ville_id ON monument(ville_id);

-- Activer Row Level Security (RLS)
ALTER TABLE ville ENABLE ROW LEVEL SECURITY;
ALTER TABLE histoire ENABLE ROW LEVEL SECURITY;
ALTER TABLE legende ENABLE ROW LEVEL SECURITY;
ALTER TABLE monument ENABLE ROW LEVEL SECURITY;

-- Politiques pour permettre la lecture publique
CREATE POLICY "Enable read access for all users" ON ville FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON histoire FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON legende FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON monument FOR SELECT USING (true);

-- Politiques pour permettre l'écriture pour les utilisateurs authentifiés
CREATE POLICY "Enable insert for authenticated users only" ON ville FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON ville FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON ville FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON histoire FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON histoire FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON histoire FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON legende FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON legende FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON legende FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON monument FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON monument FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON monument FOR DELETE USING (auth.role() = 'authenticated');
