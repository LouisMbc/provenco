-- Insertion de quelques histoires avec du contenu riche pour tester RichContent
INSERT INTO histoire (titre, contenu, ville_id, image_url, image_alt, image_caption) VALUES
(
  'L''histoire de Marseille à travers les âges',
  'La plus ancienne ville de France a une histoire riche de 2600 ans.

# Les origines phocéennes

Marseille fut fondée vers 600 avant J.-C. par des marins grecs venus de Phocée (actuelle Foça en Turquie). Ces colons s''installèrent dans une crique naturelle protégée, le Lacydon, aujourd''hui Vieux-Port.

## La légende de Gyptis et Protis

Selon la légende rapportée par Justin, historien romain :
- Protis, chef des colons phocéens, fut invité aux noces de Gyptis, fille du roi local Nann
- Gyptis choisit Protis comme époux en lui offrant une coupe d''eau
- Cette union symbolique scella l''alliance entre Grecs et Ligures

# L''époque romaine

Marseille devint **Massalia**, une cité prospère qui :
- Contrôlait le commerce méditerranéen
- Fondait de nombreuses colonies sur les côtes
- Développait l''agriculture et l''artisanat

![Image de Marseille](marseille-antique.jpg "Vue artistique de Massalia antique")

## Les monuments romains

Plusieurs vestiges témoignent de cette époque glorieuse :
1. Le théâtre antique de la Criée
2. Les docks romains du musée d''Histoire
3. La Corne d''Or (port antique)

*Marseille reste aujourd''hui marquée par cet héritage millénaire.*',
  (SELECT id FROM ville WHERE nom = 'Marseille' LIMIT 1),
  'histoire/marseille-antique.jpg',
  'Vue artistique de Massalia antique',
  'Reconstitution de Marseille à l''époque gréco-romaine'
),
(
  'Les lavandes de Valensole',
  'Au cœur de la Provence, le plateau de Valensole offre un spectacle unique au monde.

# Un paysage emblématique

Le plateau de Valensole s''étend sur plus de 800 km² entre les Alpes-de-Haute-Provence et le Var. Cette vaste plaine est devenue l''un des symboles les plus reconnaissables de la Provence.

## La culture de la lavande

La lavande fine (Lavandula angustifolia) pousse naturellement ici depuis des siècles :
- **Altitude** : entre 500 et 1200 mètres
- **Climat** : méditerranéen montagnard
- **Sol** : calcaire et bien drainé

![Champs de lavande](lavande-valensole.jpg "Champs de lavande en fleurs")

# Les traditions agricoles

## La récolte traditionnelle

Jusqu''aux années 1950, la lavande était récoltée à la main :
1. Coupe à la faucille au petit matin
2. Séchage en gerbes dans les champs
3. Battage pour séparer les fleurs

## La distillation

Le processus de distillation traditionnel :
- Cuisson à la vapeur d''eau
- Condensation dans un serpentin
- Séparation de l''huile essentielle
- Conservation en flacons ambrés

*Les parfums de Grasse utilisent encore aujourd''hui cette précieuse essence.*

# L''économie moderne

Aujourd''hui, Valensole produit :
- **80%** de la lavande française
- Plus de 100 tonnes d''huile essentielle par an
- Des milliers d''emplois directs et indirects',
  (SELECT id FROM ville WHERE nom = 'Valensole' LIMIT 1),
  'histoire/lavande-valensole.jpg',
  'Champs de lavande en fleurs',
  'Le plateau de Valensole en juillet, lors de la floraison'
);

-- Insertion de quelques légendes avec contenu riche
INSERT INTO legende (titre, contenu, ville_id, image_url, image_alt, image_caption) VALUES
(
  'La Tarasque de Tarascon',
  'Au bord du Rhône, une terrible créature terrorisait les habitants...

# La bête légendaire

La Tarasque était un monstre effrayant qui vivait dans les marécages du Rhône :
- **Corps** : celui d''un dragon écailleux
- **Tête** : semblable à un lion avec des crocs acérés
- **Queue** : terminée par un dard venimeux
- **Carapace** : couverte de pointes acérées

![La Tarasque](tarasque-statue.jpg "Statue de la Tarasque à Tarascon")

## Le fléau du Rhône

Cette créature terrorisait la région :
1. Elle dévorait les voyageurs imprudents
2. Coulait les barques sur le fleuve
3. Ravageait les cultures environnantes

# Sainte Marthe la libératrice

## L''arrivée de la sainte

Selon la tradition chrétienne, **sainte Marthe** arriva en Provence vers l''an 48 :
- Elle fuyait les persécutions en Terre Sainte
- Accompagnée de Marie-Madeleine et Lazare
- Débarqua aux Saintes-Maries-de-la-Mer

## La domestication miraculeuse

Sainte Marthe dompta la Tarasque par la prière :
- Elle l''aspergea d''eau bénite
- Lui passa son écharpe autour du cou
- La mena docile jusqu''au village

*Les habitants, d''abord effrayés, lapidèrent ensuite la bête repentie.*

# La tradition moderne

Chaque année, la **Fête de la Tarasque** perpétue cette légende :
- Défilé du dragon dans les rues
- Représentations théâtrales
- Festivités populaires

Cette tradition est inscrite au **patrimoine immatériel de l''UNESCO** depuis 2005.',
  (SELECT id FROM ville WHERE nom = 'Tarascon' LIMIT 1),
  'legende/tarasque-statue.jpg',
  'Statue de la Tarasque à Tarascon',
  'Monument représentant la légendaire Tarasque dans les rues de Tarascon'
);

-- Insertion de quelques monuments avec contenu riche
INSERT INTO monument (nom, description, ville_id, type, date_construction, image_url, image_alt, image_caption) VALUES
(
  'Palais des Papes',
  'Le plus grand palais gothique du monde occidental.

# Un symbole de puissance

Le Palais des Papes d''Avignon fut construit au XIVe siècle lorsque la papauté s''installa en Avignon (1309-1377).

## Architecture exceptionnelle

Ce monument unique combine :
- **Palais Vieux** (1335-1342) : style gothique austère
- **Palais Neuf** (1342-1352) : style plus décoratif
- **Surface** : 15 000 m² de plancher
- **Murailles** : 50 mètres de haut par endroits

![Palais des Papes](palais-papes.jpg "Le Palais des Papes vu du Rhône")

# Les papes d''Avignon

## La papauté en exil

Sept papes français résidèrent à Avignon :
1. **Clément V** (1305-1314) - initiateur du transfert
2. **Jean XXII** (1316-1334) - grand bâtisseur
3. **Benoît XII** (1334-1342) - constructeur du Palais Vieux
4. **Clément VI** (1342-1352) - constructeur du Palais Neuf
5. **Innocent VI** (1352-1362)
6. **Urbain V** (1362-1370)
7. **Grégoire XI** (1370-1378) - retour à Rome

## Faste et richesse

Le palais témoigne de la richesse pontificale :
- Fresques de Matteo Giovanetti
- Mobilier précieux et tapisseries
- Bibliothèque de plus de 2000 volumes
- Trésorerie exceptionnelle

# Aujourd''hui

Le monument est :
- **Classé UNESCO** depuis 1995
- **Musée** accueillant 650 000 visiteurs/an
- **Lieu culturel** (Festival d''Avignon)
- **Centre de recherche** médiévale

*Un incontournable du patrimoine provençal et européen.*',
  (SELECT id FROM ville WHERE nom = 'Avignon' LIMIT 1),
  'Palais',
  'Moyen Âge',
  'monument/palais-papes.jpg',
  'Le Palais des Papes vu du Rhône',
  'Vue panoramique du Palais des Papes depuis les bords du Rhône'
);
