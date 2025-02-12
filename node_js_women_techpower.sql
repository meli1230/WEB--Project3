-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2025 at 05:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_js_women_techpower`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `speaker` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `speaker`, `price`, `description`) VALUES
(5, 'Building Scalable Software Artchitectures', 'Eoin Woods', 120.50, 'Join Eoin Woods, CTO of Endava and co-author of \"Software Systems Architecture,\" for an in-depth workshop on designing and building scalable software architectures for modern applications. Learn best practices, real-world strategies, and practical tips.'),
(6, 'The future of AI in Cybersecurity', 'Nicole Eagen', 150.40, 'Nicole Eagan, co-CEO of Darktrace, explores how artificial intelligence is transforming the field of cybersecurity. Discover how machine learning models detect threats and predict vulnerabilities in real-time.'),
(7, 'Cloud-Native Development Kubernetes', 'Kelsey Hightower', 95.00, 'Kubernetes expert and Google Cloud engineer Kelsey Hightower shares his insights on cloud-native development. This session covers deployment strategies, scaling applications, and integrating Kubernetes into your development pipeline.'),
(8, 'Harnessing the Power of Data Engineering', 'Zhamak Dehghani', 130.75, 'Zhamak Dehghani, creator of the \"Data Mesh\" concept, discusses modern data engineering practices. Learn how data meshes enable decentralized data ownership and efficient collaboration in data-driven organizations.'),
(9, 'Nagivating the Ethical Challenges of AI', 'Timmit Gebru', 110.00, 'AI ethics advocate Timnit Gebru leads a thought-provoking discussion on the ethical implications of artificial intelligence. This session highlights fairness, transparency, and the role of technologists in shaping a responsible AI future.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'melisa', '$2b$10$t7j2RUzG5Cvgb6BhI2jxV.7cQ9t6xy8V1MYVvdAQQ3p0W1Y5jRb9G'),
(2, 'lala', '$2b$10$33nkAVoWPvwDwue0RCGI8O4hRuh.Uu5wEp2bRDffwm0Et5rogFabm'),
(3, 'del', '$2b$10$bjVYLDnn.KX0cT4nHb1Abu/7gMqYYCbA9tCzV4vEF5VIP19OdaMs.'),
(4, 'iulia', '$2b$10$aw9fpv6uk/djuy0YZOYAM.KY4qlPkTbiQnQ9G8nxUiMaJhiQNrMyC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
