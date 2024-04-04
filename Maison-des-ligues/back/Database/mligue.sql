-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 14 mars 2024 à 14:55
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

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id`, `pid`, `uid`, `name`, `details`, `price`, `image`, `quantity`) VALUES
(55, '674e3a80-ea39-4be0-859d-0934f777e71b', '0ea13da9-8043-4c36-9f83-377dcb6ef395', 'MARION', 'pas gentille ', 1, 'uploads\\1705331426690IMG_20240103_213710.jpg', 2),
(56, '3450bcb8-a439-4d2d-8623-62b8389e47f9', '0143b557-e989-4120-97c7-2e88b171a893', 'TR', 'TR', 1, 'uploads\\1705333156622.jfif', 2),
(58, '674e3a80-ea39-4be0-859d-0934f777e71b', '0ea13da9-8043-4c36-9f83-377dcb6ef395', 'MARION', 'pas gentille ', 1, 'uploads\\1705331426690IMG_20240103_213710.jpg', 3);

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
('264543c5-5713-4016-8923-806713440b97', 'szerty', '5', 1, 'uploads\\1705425604819.jfif', 10),
('3450bcb8-a439-4d2d-8623-62b8389e47f9', 'TR', 'TR', 1, 'uploads\\1705333156622.jfif', 10),
('674e3a80-ea39-4be0-859d-0934f777e71b', 'MARION', 'pas gentille ', 1, 'uploads\\1705331426690IMG_20240103_213710.jpg', 10),
('906aa0c2-eec5-4502-8bc3-b74184062311', 'test', 'TEST', 2333, 'uploads\\1705332900109.jpg', 10),
('ba97807b-6367-46d8-bba6-4b64fc0be1e5', 'nilo', 'dert', 25, 'uploads\\1706473131382.jpg', 10);

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
('0143b557-e989-4120-97c7-2e88b171a893', 'admin', 'q@q', '$2b$10$XIwMiUtL0IYQ7FgQZQozzutTJ97aUKMA1zA7nLG15zfOa.iaemNke', 1),
('0ea13da9-8043-4c36-9f83-377dcb6ef395', 'christ', 'a@a', '$2b$10$tMAHXv3jYBvYvN4Xr9qSc.tnImip0IfjIEIqQhpzz9Hg7SpumK/qW', 0),
('c80ff41b-13e7-4f12-beff-f0802df93cce', 'test', 'test@example.com', '$2b$10$YxYIxn9vBPFLRUlg3bJwZeEEN0GLLX9Mm5V2YH9w7EDd7QaBTwBfq', 0),
('de780a32-3edd-4319-bada-632f0d8ad160', 'test', 'test@example.com', '$2b$10$k1399GEGMnYxf.rmGO7yPe46IK8RWXvaZWdIu47HVt6U/rUE26YZm', 0),
('e8efaad2-8acc-4a17-9d02-f8e27000638c', 'test', 'test@example.com', '$2b$10$7wbdQw582qT6R9SI7FPotOMLk5rx1opEwn05CNjlXVtPYpkv11n/i', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

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
