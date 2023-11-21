-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-11-2023 a las 23:34:20
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ver`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `query_comments`
--

CREATE TABLE `query_comments` (
  `id` int(11) NOT NULL,
  `id_query` int(11) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saved_queries`
--

CREATE TABLE `saved_queries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user` varchar(50) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `query` text DEFAULT NULL,
  `modified_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `query_comments`
--
ALTER TABLE `query_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_query` (`id_query`);

--
-- Indices de la tabla `saved_queries`
--
ALTER TABLE `saved_queries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `query_comments`
--
ALTER TABLE `query_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `saved_queries`
--
ALTER TABLE `saved_queries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `query_comments`
--
ALTER TABLE `query_comments`
  ADD CONSTRAINT `query_comments_ibfk_1` FOREIGN KEY (`id_query`) REFERENCES `saved_queries` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
