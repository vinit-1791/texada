-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2018 at 01:46 PM
-- Server version: 5.6.21
-- PHP Version: 5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `texada`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
`product_ID` int(11) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_ID`, `product_description`, `is_active`, `created_at`) VALUES
(1, 'Cesna 120', 1, '2018-03-10 22:01:58'),
(2, 'DC-6 Twin Otter', 1, '2018-03-10 22:01:58'),
(3, 'Piper M600', 1, '2018-03-10 22:01:58'),
(4, 'Art Boom 6500', 1, '2018-03-10 22:01:58'),
(5, 'Amazing new aircraft', 1, '2018-03-11 15:44:40'),
(6, 'Another aircraft', 0, '2018-03-11 20:36:43'),
(7, 'bombardier', 0, '2018-03-10 23:38:03'),
(8, 'New plane', 0, '2018-03-11 20:42:04');

-- --------------------------------------------------------

--
-- Table structure for table `product_tracking`
--

CREATE TABLE IF NOT EXISTS `product_tracking` (
`tracking_ID` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `elevation` int(5) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_tracking`
--

INSERT INTO `product_tracking` (`tracking_ID`, `product_id`, `longitude`, `latitude`, `elevation`, `time`) VALUES
(1, 1, '43.25832640', '-81.81498070', 500, '2016-10-12 12:00:00'),
(2, 2, '43.45911200', '-80.38669300', 500, '2016-10-12 12:00:00'),
(3, 3, '44.45911200', '-81.38669300', 500, '2016-10-12 12:00:00'),
(4, 1, '42.55911200', '-79.28669300', 550, '2016-10-13 12:00:00'),
(6, 1, '43.55911200', '-85.28669300', 600, '2016-10-14 12:00:00'),
(7, 1, '42.31197350', '-83.09411790', 650, '2016-10-15 12:00:00'),
(8, 2, '42.45911200', '-79.38669300', 550, '2018-03-11 12:00:00'),
(9, 2, '43.45911200', '-85.38669300', 450, '2016-03-11 12:00:00'),
(10, 2, '44.45911200', '-81.38669300', 400, '2018-03-11 12:00:00'),
(11, 3, '45.45911200', '-82.38669300', 600, '2016-03-10 12:00:00'),
(12, 3, '46.45911200', '-83.38669300', 700, '2018-03-11 12:00:00'),
(13, 3, '47.45911200', '-84.38669300', 800, '2018-03-11 12:00:00'),
(14, 3, '48.45911200', '-85.38669300', 900, '2018-03-11 12:00:00'),
(15, 4, '43.76346180', '-79.36881910', 800, '2016-08-04 12:00:00'),
(16, 4, '43.80014680', '-79.23423650', 400, '2017-08-17 02:00:00'),
(17, 4, '44.51165000', '-80.12394220', 550, '2017-08-04 02:20:00'),
(18, 1, '43.15014390', '79.05049450', 300, '2017-08-04 13:20:00'),
(19, 8, '123.00000000', '12.00000000', 100, '2010-06-08 15:41:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
 ADD PRIMARY KEY (`product_ID`);

--
-- Indexes for table `product_tracking`
--
ALTER TABLE `product_tracking`
 ADD PRIMARY KEY (`tracking_ID`), ADD KEY `product_id` (`product_id`), ADD KEY `product_id_2` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
MODIFY `product_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `product_tracking`
--
ALTER TABLE `product_tracking`
MODIFY `tracking_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_tracking`
--
ALTER TABLE `product_tracking`
ADD CONSTRAINT `product_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
