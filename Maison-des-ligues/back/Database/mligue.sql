-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 11 avr. 2024 à 12:41
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mligue`
--

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id` int(11) NOT NULL,
  `pid` char(36) NOT NULL,
  `uid` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `details` varchar(200) NOT NULL,
  `price` int(10) NOT NULL,
  `image` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `pid` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `details` varchar(200) NOT NULL,
  `price` int(10) NOT NULL,
  `image` varchar(100) NOT NULL,
  `quantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`pid`, `name`, `details`, `price`, `image`, `quantity`) VALUES
('0b271564-dd2b-4633-b79e-fa8236ab7f1b', 'Kit haltères de musculation', 'Ce kit haltères 20 kg permet la réalisation de nombreux exercices de musculation à domicile. Ajoutez des poids sur l\'haltère au fil de vos progrès.\r\n\r\nFacile à ranger et à transporter grâce à sa valis', 45, 'uploads\\1712831476683.jpg', 50),
('16da84be-7f31-4f95-982b-4b856d9f4515', 'Ballon de Gymnastique Rythmique', 'Ce ballon conçu pour la pratique de la Gymnastique Rythmique répond aux besoins spécifiques de ce sport : maniabilité & légèreté', 25, 'uploads\\1712828246697.jpg', 20),
('17a871df-b47a-442c-a7bd-bc0501c34fb4', 'Lot Raquette de Badminton Adulte BR 190 Partner - Bleu/Violet', 'Conçu pour le joueur de badminton occasionnel, régulier à la recherche d\'une raquette solide et confortable apportant puissance et tolérance\r\n\r\nCette raquette offre une grande zone de frappe pour dimi', 35, 'uploads\\1712828626170.png', 60),
('182ba6cf-e351-4ef3-99b1-a84113ea7f9c', 'Masque Easybreath de surface', 'Grâce à sa vision panoramique et la possibilité de respirer par le nez et la bouche, la découverte de l\'univers aquatique est encore plus accessible avec le masque Easybreath ', 27, 'uploads\\1712830716352.png', 30),
('1f8ce7c2-e472-492e-b883-94486fcbbdbf', 'Table de ping pong 600X', 'Conçue pour la pratique du tennis de table en loisir, en famille, en extérieur.\r\n\r\nLa 600X bénéficie du meilleur des innovations sans pour autant faire de compromis sur les fondamentaux : sécurité, er', 246, 'uploads\\1712831066335.png', 23),
('22119346-54c2-4ce7-b6c1-299010f95c7b', 'Fleuret électrique APEX 90cm', 'Pratiquant d\'escrime faisant du fleuret. Modèle 90 cm droit approuvé par la FIE, idéal pour tous les types de compétitions', 199, 'uploads\\1712831804243.jpg', 10),
('4111793d-f5d0-4509-a408-7823660bb3f2', 'Paire d\'haltères aquatiques Pullstep mesh Aquagym bleu orange', 'Et si vous faisiez votre jogging dans l\'eau ? Le Pullstep est adapté pour différents exercices pour accentuer le renforcement musculaire du bas du corps et/ou l\'endurance cardiovasculaire .', 20, 'uploads\\1712829747150.png', 30),
('ac21e24c-e164-4b9d-976b-77cf52467df1', 'But de football', 'Nos équipes de conception ont développé ce but pour les passionnés de football qui souhaitent jouer en famille ou entre amis sur tous types de terrain de jeu.', 38, 'uploads\\1712831627846.png', 46),
('c22855b0-d033-4e57-a6d4-a7aebbdc9be7', 'CIBLE DE FLÉCHETTES ELECTRONIQUE ', 'Conçu pour le joueur de fléchettes confirmé cherchant une cible électronique facile, interactive, avec des portes de rangement , La cible ED 520 avec ses 4 écrans est faite pour vous. ', 40, 'uploads\\1712830334713.jpg', 30),
('c744910f-0e6a-4436-abe8-276d8df247d4', 'Panier de basket sur pied', 'Ce panier de basketball sur pied est parfait pour débuter. Il propose 5 hauteurs de jeu de 2,20m à 3,05 m. Deux roulettes facilitent son déplacement et l\'épaisseur de la planche améliore le rebond.', 149, 'uploads\\1712829505768.png', 30),
('de6c4811-303a-43d1-8d2f-fea352c86696', ' ARC GEOLOGIC ', 'Nous avons conçu ce nécessaire pour découvrir le tir à l\'arc en loisir de 5 à 10 m avec une pointe ventouse (sécurité). Vous partagerez un bon moment en famille', 40, 'uploads\\1712828382318.jpg', 25),
('f7f2351a-ad8d-4ab9-9aad-287a95054bcb', 'Ballon de basket ', 'Ce ballon de basket taille 7 officielle pour les enfants à partir de 13 ans et les adultes. Robuste et agrippant, il est parfait pour débuter en extérieur à la maison ou sur le playground.\r\n\r\n\r\n', 7, 'uploads\\1712829198429.png', 50);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `uid` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `password`, `admin`) VALUES
('696720dc-dd69-46ba-9645-8126b4b25566', 'USER', 'user@user', '$2b$10$vq.j9A8R8fg2D8.eEKqT1OYkjD61roNIx.WRV0vp4lxMgmH5VYU.m', 0),
('8a6399f7-bed8-4a13-80a7-f62f215386b5', 'admin', 'admin@admin', '$2b$10$Lk7dZt2z3cxxHxW0aV9QR.v576qdSMcqcFICGwIuyp2i.9pAo4cY2', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_panier_uid` (`uid`),
  ADD KEY `fk_panier_pid` (`pid`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pid`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `fk_panier_pid` FOREIGN KEY (`pid`) REFERENCES `products` (`pid`),
  ADD CONSTRAINT `fk_panier_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
