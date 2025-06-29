-- Script SQL pour populer la base de données avec des données d'exemple sur la Provence

-- Insertion des villes
INSERT INTO ville (nom, code_postal, departement, population, latitude, longitude) VALUES
('Aix-en-Provence', '13100', 'Bouches-du-Rhône', 145325, 43.529742, 5.447427),
('Marseille', '13001', 'Bouches-du-Rhône', 870018, 43.296482, 5.369780),
('Avignon', '84000', 'Vaucluse', 93671, 43.949317, 4.805528),
('Arles', '13200', 'Bouches-du-Rhône', 52439, 43.676040, 4.630760),
('Orange', '84100', 'Vaucluse', 29268, 44.136720, 4.808720),
('Saint-Tropez', '83990', 'Var', 4103, 43.274370, 6.640250),
('Cannes', '06400', 'Alpes-Maritimes', 74152, 43.552847, 7.017369),
('Nice', '06000', 'Alpes-Maritimes', 342637, 43.710173, 7.261953),
('Cassis', '13260', 'Bouches-du-Rhône', 7265, 43.214540, 5.538390),
('Les Baux-de-Provence', '13520', 'Bouches-du-Rhône', 381, 43.744780, 4.795430);

-- Insertion des histoires
INSERT INTO histoire (ville_id, titre, contenu, periode) VALUES
(1, 'La fondation d''Aix-en-Provence', 'Aix-en-Provence fut fondée en 122 av. J.-C. par le consul romain Caius Sextius Calvinus. Il établit un camp fortifié près des sources thermales découvertes par ses légions, donnant naissance à "Aquae Sextiae". La ville devint rapidement un centre important de la Gaule romaine, célèbre pour ses thermes et sa position stratégique.', 'Antiquité'),
(2, 'Marseille, la plus ancienne ville de France', 'Marseille fut fondée vers 600 av. J.-C. par des marins grecs de Phocée qui lui donnèrent le nom de Massalia. Selon la légende, le chef grec Protis épousa Gyptis, fille du roi ligure, scellant ainsi l''alliance entre les deux peuples. Cette cité grecque devint un comptoir commercial majeur de la Méditerranée.', 'Antiquité'),
(3, 'La papauté d''Avignon', 'De 1309 à 1423, Avignon fut le siège de la papauté catholique. Sept papes successifs s''installèrent dans la cité, faisant construire le majestueux Palais des Papes. Cette période, connue sous le nom de "captivité de Babylone", transforma Avignon en capitale de la chrétienté occidentale et lui valut le surnom de "Rome du Nord".', 'Moyen Âge'),
(4, 'Van Gogh à Arles', 'Vincent van Gogh séjourna à Arles de février 1888 à mai 1889. Séduit par la lumière provençale, il y peignit plus de 300 œuvres, dont les célèbres "Tournesols" et "La Chambre à coucher". Son passage marqua profondément la ville, qui conserve aujourd''hui de nombreux lieux liés à sa mémoire.', 'XIXe siècle'),
(5, 'Le théâtre antique d''Orange', 'Le théâtre antique d''Orange fut construit au Ier siècle sous l''empereur Auguste. Avec son mur de scène haut de 37 mètres, il est l''un des théâtres romains les mieux conservés au monde. Il pouvait accueillir jusqu''à 10 000 spectateurs et résonne encore aujourd''hui lors du prestigieux festival d''été.', 'Antiquité');

-- Insertion des légendes
INSERT INTO legende (ville_id, titre, contenu, origine) VALUES
(1, 'La fontaine des Quatre-Dauphins', 'Selon la légende, quatre dauphins magiques protègent la ville d''Aix-en-Provence depuis la nuit des temps. Ces créatures mystiques, sculptées dans la pierre, s''animent chaque nuit de pleine lune pour veiller sur les habitants. Quiconque boirait l''eau de leur fontaine au moment précis de minuit verrait tous ses vœux se réaliser.', 'Tradition orale'),
(2, 'La bonne mère de Marseille', 'Notre-Dame-de-la-Garde, surnommée "la Bonne Mère", veille sur Marseille depuis sa colline. La légende raconte qu''elle apparut à un marin en perdition lors d''une terrible tempête, lui montrant le chemin du port. Depuis, tous les marins lui rendent hommage avant de prendre la mer, et elle protège la ville de tous les malheurs.', 'Tradition maritime'),
(10, 'Les fées des Baux', 'Au sommet du village des Baux-de-Provence, des fées bienveillantes auraient élu domicile dans les ruines du château. Ces créatures lumineuses, visibles seulement au coucher du soleil, protègent le village et ses habitants. On dit qu''elles accordent sagesse et bonheur à ceux qui respectent la beauté sauvage des lieux.', 'Folklore local'),
(6, 'La malédiction de Brigitte Bardot', 'Une légende moderne raconte que l''actrice Brigitte Bardot, tombée amoureuse de Saint-Tropez, aurait lancé un sort bienveillant sur le village. Toute personne qui foule le sol tropézien avec un cœur pur y trouvera l''amour ou la célébrité. Cette légende contemporaine explique pourquoi tant de stars continuent d''affluer vers cette destination magique.', 'Légende moderne');

-- Insertion des monuments
INSERT INTO monument (ville_id, nom, type, date_construction, description) VALUES
(1, 'Cathédrale Saint-Sauveur', 'Cathédrale', 'Ve-XVIIe siècle', 'Remarquable ensemble architectural mêlant art roman, gothique et baroque. Elle abrite de précieuses œuvres d''art dont le triptyque du Buisson ardent de Nicolas Froment.'),
(1, 'Fontaine de la Rotonde', 'Fontaine', '1860', 'Monumentale fontaine construite par Théophile de Tournadre, ornée de trois statues représentant la Justice, l''Agriculture et les Beaux-Arts.'),
(2, 'Basilique Notre-Dame-de-la-Garde', 'Basilique', '1853-1864', 'Basilique de style romano-byzantin perchée sur la colline de la Garde, surmontée d''une statue dorée de la Vierge Marie haute de 9,7 mètres.'),
(2, 'Palais Longchamp', 'Palais', '1862-1869', 'Monument commémoratif de l''arrivée des eaux de la Durance à Marseille, abritant le Musée des Beaux-Arts et le Muséum d''Histoire naturelle.'),
(3, 'Palais des Papes', 'Palais', '1335-1364', 'Plus grand palais gothique au monde, résidence des papes au XIVe siècle. Classé au patrimoine mondial de l''UNESCO.'),
(3, 'Pont Saint-Bénézet', 'Pont', 'XIIe siècle', 'Célèbre pont médiéval immortalisé par la chanson "Sur le pont d''Avignon". Il ne reste aujourd''hui que quatre arches des vingt-deux originales.'),
(4, 'Amphithéâtre romain', 'Amphithéâtre', 'Ier siècle', 'Amphithéâtre romain pouvant accueillir 20 000 spectateurs, l''un des mieux conservés de France. Encore utilisé pour des spectacles aujourd''hui.'),
(4, 'Église Saint-Trophime', 'Église', 'XIIe siècle', 'Chef-d''œuvre de l''art roman provençal, célèbre pour son portail sculpté et son cloître aux chapiteaux historiés.'),
(5, 'Théâtre antique', 'Théâtre', 'Ier siècle', 'Théâtre romain exceptionnellement conservé, inscrit au patrimoine mondial de l''UNESCO. Son mur de scène mesure 37 mètres de hauteur.'),
(5, 'Arc de triomphe', 'Arc de triomphe', 'Ier siècle', 'Arc de triomphe romain érigé en l''honneur des vétérans de la IIe légion gallique, orné de bas-reliefs représentant des scènes de bataille.'),
(10, 'Château des Baux', 'Château', 'Xe-XIIIe siècle', 'Forteresse médiévale en ruines perchée sur un éperon rocheux, offrant un panorama exceptionnel sur la Provence.'),
(9, 'Château de Cassis', 'Château', 'XIVe siècle', 'Château médiéval dominant le port de Cassis, témoin de l''histoire mouvementée de cette cité maritime.');

-- Insertion d'images d'exemple (URLs fictives)
INSERT INTO image (url, description, ville_id) VALUES
('/images/aix/cathedrale.jpg', 'Vue extérieure de la Cathédrale Saint-Sauveur d''Aix-en-Provence', 1),
('/images/aix/fontaine-rotonde.jpg', 'La fontaine de la Rotonde au coucher du soleil', 1),
('/images/marseille/notre-dame.jpg', 'Notre-Dame-de-la-Garde dominant Marseille', 2),
('/images/marseille/vieux-port.jpg', 'Le Vieux-Port de Marseille et ses bateaux', 2),
('/images/avignon/palais-papes.jpg', 'Le majestueux Palais des Papes', 3),
('/images/avignon/pont.jpg', 'Le célèbre Pont Saint-Bénézet', 3),
('/images/arles/amphitheatre.jpg', 'L''amphithéâtre romain d''Arles', 4),
('/images/orange/theatre.jpg', 'Le mur de scène du théâtre antique', 5);

INSERT INTO image (url, description, monument_id) VALUES
('/images/monuments/saint-sauveur-interieur.jpg', 'Intérieur de la cathédrale avec le triptyque', 1),
('/images/monuments/notre-dame-statue.jpg', 'La statue dorée de la Vierge Marie', 3),
('/images/monuments/palais-papes-salle.jpg', 'Grande salle du Palais des Papes', 5),
('/images/monuments/amphitheatre-gradins.jpg', 'Les gradins de l''amphithéâtre d''Arles', 7);

-- Quelques histoires supplémentaires pour enrichir le contenu
INSERT INTO histoire (ville_id, titre, contenu, periode) VALUES
(9, 'Les calanques de Cassis', 'Les calanques de Cassis, véritables fjords méditerranéens, se sont formées il y a des millions d''années. Ces criques aux eaux turquoise étaient déjà connues des Grecs et des Romains qui y puisaient l''argile blanche pour leurs poteries. Au XIXe siècle, elles inspirèrent de nombreux peintres comme Paul Cézanne et André Derain.', 'Géologie/Art'),
(10, 'Les seigneurs des Baux', 'La famille des Baux régna sur ce territoire du Xe au XVe siècle. Ces puissants seigneurs prétendaient descendre du roi mage Balthazar et avaient inscrit l''étoile de Bethléem dans leurs armoiries. Leur devise "Au hasard Balthazar" témoigne de leur origine légendaire. Le dernier des Baux légua ses terres au roi de France en 1426.', 'Moyen Âge');

-- Quelques légendes supplémentaires
INSERT INTO legende (ville_id, titre, contenu, origine) VALUES
(4, 'Les Alyscamps mystérieux', 'Les Alyscamps d''Arles, ancienne nécropole romaine, seraient hantés par les âmes des chevaliers de Charlemagne. Selon la légende, ces preux guerriers y reposent en attendant le jugement dernier. Les sarcophages vides que l''on y trouve auraient été emportés par le Rhône un soir de crue mystérieuse, ne laissant que les âmes gardiennes des lieux.', 'Légende médiévale'),
(9, 'Le trésor du cap Canaille', 'Au sommet du cap Canaille, la plus haute falaise maritime d''Europe, serait caché le trésor du pirate Barbe-Noire. Une grotte secrète, accessible seulement lors des grandes marées, renfermerait coffres d''or et bijoux. Mais gare aux imprudents : le fantôme du pirate protège jalousement son butin et égare ceux qui s''aventurent sans respect dans son domaine.', 'Légende pirate');
