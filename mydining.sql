-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2024 at 11:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydining`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `tabletype` int(11) NOT NULL,
  `time` time(6) DEFAULT NULL,
  `cid` bigint(20) DEFAULT NULL,
  `rid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `date`, `tabletype`, `time`, `cid`, `rid`) VALUES
(3, '2024-05-12', 2, '11:00:00.000000', 1, 4),
(4, '2024-05-12', 2, '11:00:00.000000', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `email`, `name`, `password`) VALUES
(1, 'vishwavinnu4@gmail.com', 'Vishwateja', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `id` bigint(20) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `table_count` int(11) NOT NULL,
  `table_count1` int(11) NOT NULL,
  `table_count2` int(11) NOT NULL,
  `table_count3` int(11) NOT NULL,
  `rest_image` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `location`, `name`, `table_count`, `table_count1`, `table_count2`, `table_count3`, `rest_image`, `rating`) VALUES
(3, 'Lalbagh', 'Beijing Bites', 50, 25, 15, 10, 'hydspice.jpg', 4.3),
(4, 'Church Street', 'Chowman', 30, 15, 10, 5, 'chowman.jpg', 4.1),
(5, 'Kormangala', 'IQ Eat', 50, 25, 15, 10, 'iqeatr.jpg', 4.4),
(6, 'Bannerghatta', 'GSB Foods', 50, 25, 15, 10, 'gsb.jpg', 4.3),
(7, 'Malleshwaram', 'Meghana Foods', 30, 15, 10, 5, 'hydspice.jpg', 4.2),
(8, 'Hebbal', 'Plan B', 50, 25, 15, 10, 'planb.jpg', 4.3),
(9, 'Central Bangalore', 'Paradise', 50, 25, 15, 10, 'paradise.jpg', 4.1),
(10, 'Banashankari', 'The Terminus', 30, 15, 10, 5, 'terminus.jpg', 4.1),
(11, 'Silk Board', 'Barbeque Nation', 50, 25, 15, 10, 'barbeque.jpg', 4.5),
(12, 'White Field', 'Mayuri', 50, 25, 15, 10, 'mayuri.jpg', 4.3),
(13, 'White Field', 'Onesta', 30, 15, 10, 5, 'onesta.jpg', 4.2),
(14, 'Silk Board', 'Behrouse', 50, 25, 15, 10, 'behrouz.jpg', 4.4),
(15, 'Central Bangalore', 'Kozy Brew Cafe', 50, 25, 15, 10, 'kozy.jpg', 4.4),
(16, 'Banashankari', 'Citrus Cafe', 30, 15, 10, 5, 'cirus.jpg', 4.2),
(17, 'Bannerghatta', '46 Ounces', 50, 25, 15, 10, '46ounces.jpg', 3.9),
(18, 'Church Street', 'Kapoor\'s Cafe', 50, 25, 15, 10, 'kapoor.jpg', 3.9),
(19, 'El. City', 'Hyderabadi Spice', 30, 15, 10, 5, 'hydspice.jpg', 4.1),
(20, 'Marathalli', 'Venadu Restaurant', 50, 25, 15, 10, 'venadu.jpg', 4.2),
(21, 'Marathalli', 'Street 1522', 50, 25, 15, 10, 'street1512.jpg', 4.1),
(22, 'El. City', 'Thunder Shawarma', 30, 15, 10, 5, 'thundershawarma.jpg', 4.3),
(23, 'Marathalli', 'Nivys Resto Cafe', 50, 25, 15, 10, 'nivys.jpg', 4.4),
(24, 'Marathalli', 'Yummy Delights', 50, 25, 15, 10, 'yummydelights.jpg', 4.1),
(25, 'El. City', 'Hyderabadi Spice', 30, 15, 10, 5, 'paradise.jpg', 4.4),
(26, 'Marathalli', 'Paradise', 50, 25, 15, 10, 'paradise.jpg', 4.3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8ydejlntdvmmqy1hodq3j3ocp` (`cid`),
  ADD KEY `FK3o7tphqtxefy41qgx3x6ek8fl` (`rid`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FK3o7tphqtxefy41qgx3x6ek8fl` FOREIGN KEY (`rid`) REFERENCES `restaurant` (`id`),
  ADD CONSTRAINT `FK8ydejlntdvmmqy1hodq3j3ocp` FOREIGN KEY (`cid`) REFERENCES `customer` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
