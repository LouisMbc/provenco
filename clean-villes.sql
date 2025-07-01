-- Script pour nettoyer les villes dupliquées
-- Garde seulement la première occurrence de chaque ville (par nom + département)

WITH villes_doublons AS (
  SELECT 
    id,
    nom,
    departement,
    ROW_NUMBER() OVER (PARTITION BY nom, departement ORDER BY id) as rang
  FROM ville
)
DELETE FROM ville 
WHERE id IN (
  SELECT id 
  FROM villes_doublons 
  WHERE rang > 1
);

-- Afficher le résultat
SELECT 
  departement,
  COUNT(*) as nombre_villes
FROM ville 
GROUP BY departement 
ORDER BY departement;
