-- phpMyAdmin SQL Dump
-- version 5.2.2deb1+deb13u1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 12, 2026 at 02:49 PM
-- Server version: 11.8.6-MariaDB-0+deb13u1 from Debian
-- PHP Version: 8.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s22102454_denzo`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `aboutID` int(11) NOT NULL,
  `headerImg_OriginalName` varchar(255) NOT NULL,
  `headerImgName_id` varchar(255) NOT NULL,
  `doctorImg_OriginalName` varchar(255) NOT NULL,
  `doctorImgName_id` varchar(255) NOT NULL,
  `doctorName` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `credentials` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`aboutID`, `headerImg_OriginalName`, `headerImgName_id`, `doctorImg_OriginalName`, `doctorImgName_id`, `doctorName`, `mobile`, `telephone`, `email`, `address`, `credentials`) VALUES
(1, 'clinic_img.jpg', 'header_682227f9715bb7.31504799.jpg', 'Janeth_pfp.jpg', 'doctor_680a70a42c18c8.74775689.jpg', 'Dr. Janeth D. Samson', '09177702025', '0323289523', '', '9XRM+M6M, Central Nautical Hwy, Liloan, 6002 Cebu', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus, massa eu congue ultricies, nibh arcu facilisis mauris, a dignissim sem ligula eget neque. Sed ex leo, consequat sed elit quis, bibendum luctus magna. Fusce metus eros, finibus ac odio id, sollicitudin lacinia nisi. Sed turpis augue, convallis quis lectus a, tincidunt sagittis elit. Nam ut lacus quis ipsum commodo egestas et convallis quam. Donec est orci, viverra non lacus a, laoreet consectetur libero. Sed viverra fermentum sapien, sit amet tincidunt lectus efficitur at. Duis vitae imperdiet enim, consectetur congue quam. Morbi quis dapibus nibh.');

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `announcementID` int(11) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`announcementID`, `message`) VALUES
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ante nulla. Nunc sit amet risus vitae ligula consequat bibendum. Praesent et erat felis. Proin sollicitudin ipsum risus, non mattis mi elementum eu. Duis sollicitudin erat et erat feugiat, non porta erat iaculis. Sed ac ipsum ut dui posuere consectetur quis vitae lorem. Ut a est commodo, egestas lacus sed, tincidunt velit. Curabitur sagittis at massa quis facilisis. Mauris dui massa, consequat molestie malesuada vitae, semper vel turpis. Suspendisse convallis rutrum enim, eu facilisis turpis convallis a. Phasellus interdum augue id lorem posuere, id ultrices metus rutrum. Sed egestas leo a placerat vestibulum. Aliquam iaculis pretium ligula, ac gravida ex mattis placerat. Nullam finibus dignissim convallis. Pellentesque vel felis in orci sagittis volutpat.'),
(2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ante nulla. Nunc sit amet risus vitae ligula consequat bibendum. Praesent et erat felis. Proin sollicitudin ipsum risus, non mattis mi elementum eu. Duis sollicitudin erat et erat feugiat, non porta erat iaculis. Sed ac ipsum ut dui posuere consectetur quis vitae lorem. Ut a est commodo, egestas lacus sed, tincidunt velit. Curabitur sagittis at massa quis facilisis. Mauris dui massa, consequat molestie malesuada vitae, semper vel turpis. Suspendisse convallis rutrum enim, eu facilisis turpis convallis a. Phasellus interdum augue id lorem posuere, id ultrices metus rutrum. Sed egestas leo a placerat vestibulum. Aliquam iaculis pretium ligula, ac gravida ex mattis placerat. Nullam finibus dignissim convallis. Pellentesque vel felis in orci sagittis volutpat.'),
(3, 'Hello\r\n\r\n\r\n\r\n\r\nSir Christian Guapo'),
(4, '                                                                                                             Hello'),
(5, 'Wassupp');

-- --------------------------------------------------------

--
-- Table structure for table `credential`
--

CREATE TABLE `credential` (
  `credID` int(11) NOT NULL,
  `credential_pic_originalName` varchar(255) NOT NULL,
  `credential_pic_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `itemID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_OriginalName` varchar(255) NOT NULL,
  `item_pic_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`itemID`, `quantity`, `item_OriginalName`, `item_pic_id`) VALUES
(2, 1, 'glasses_2.png', 'pfp_68161ae6661728.72921367.png'),
(3, 1, 'glasses_3.png', 'pfp_6818358d8cf900.77980791.png'),
(4, 1, 'glasses_4.png', 'pfp_6818359a5227d8.82075210.png'),
(5, 1, 'glasses_5.png', 'pfp_68183c87abf8a4.79619892.png'),
(11, 2, 'glasses_7.png', 'pfp_6820ad07959215.94467496.png'),
(13, 1, 'glasses_3.png', 'pfp_6823a43db60331.68869242.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(30) NOT NULL,
  `profile_pic_originalName` varchar(255) NOT NULL,
  `profile_pic_id` varchar(255) NOT NULL,
  `verification_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `email`, `password`, `role`, `profile_pic_originalName`, `profile_pic_id`, `verification_token`) VALUES
(1, 'Mauris Matthew Samson', 'maurismattio@gmail.com', '123456', 'doctor', 'shrek.png', 'pfp_680ee423abb944.15697739.png', NULL),
(2, 'Michael Bon Samson', 'michael@gmail.com', '$2y$10$rrSgqf7ZOkANXSsE3Ikr5ut8i5DC6/j20KDecwNYMOqTEUPB/bxGm', '', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(3, 'Jaden Dacanay', 'dax123@yahoo.com', '$2y$10$BAIY.97YEvZ5gJ0iUOxQAe5lue4WzCP9RZCNYd52y5e6x.dajq5n6', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(4, 'Jake Dupont', 'dup123@gmail.com', '$2y$10$FdJHbbdiD0R8ynct/75x4OTiRlfvFDGl9q1WZBCmqFzvrYCnQqKWK', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(5, 'Don Jake', 'don123@gmail.com', '$2y$10$UYhybweuZSQRu1rQpdLJ6.I9N.Xs4VRg4a741ep47HDeTw8uIpMgi', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(6, 'matt sam', 'mattsam@gmail.com', '$2y$10$n01ADKne2vaJwnKTayvOJuGuUstOMsiU7fsvSLugKda0Q2z5BGLaO', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(7, 'Michu Samson', 'denzbonito@gmail.com', '$2y$10$846KAlcMhDbiLCdZjwWYYeMIXN5gdP6p7HogN4vr0F5vE8JK02eY2', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(8, 'matt ray', 'ray123@gmail.com', '123', 'assistant', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(9, 'roy roy', 'roy123@gmail.com', '$2y$10$Aa0C6BfH8g0f6l7wvfAJCebeHN5.DfChtMJqPAl5PdnpHy2ExOl2i', 'doctor', 'shrek.png', 'pfp_680cd348d8c688.51108473.png', NULL),
(10, 'ram ram', 'ram123@gmail.com', '$2y$10$.Fjid3ZDWQ76cE6BwzGK/eLBqDxG/Pr1v68SBOmSel3lZnhH6LMj2', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(11, 'Michael Bon Samson', '22102472@usc.edu.ph', '$2y$10$YrUtYtLuuZt3AG5mLyBB9unMENMk294wGLZSxSj42Cd.Nfzraq9vi', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(12, 'Mauris Lami Kaayo', 'maurislamikaayo@gmail.com', '$2y$10$wm.e6y6oYkvAzLRuJ/y4uelFHI6TA5bRuqZo14ccd4uRzw8s62E8W', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(13, 'nigger asdsad', 'hitler@Esex.com', '$2y$10$PjnnbLOQaqpa.V6DlEIJl.BhkF9djyzNB9Oestgc75ZwZrcV1v0MS', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL),
(14, 'Arjoe Marata', 'arjoemarata52@gmail.com', '$2y$10$VSnezOwcYoDU2dJAY3ERIuYsAE10dqVdaQ2nmxHK1zx5H1dxeBz0m', 'patient', '514696065_1909151266549280_3208341736076204867_n.jpg', 'pfp_68721867cd6205.25752474.jpg', NULL),
(15, 'Von M', '19101343@usc.edu.ph', '$2y$10$KRmWLI8l5Swu95cyKSfPQO7h/e6z.lN4Oq5000y9ERy7v31yEsztO', 'patient', 'default_pfp.jpg', 'default_pfp.jpg', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`aboutID`);

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`announcementID`);

--
-- Indexes for table `credential`
--
ALTER TABLE `credential`
  ADD PRIMARY KEY (`credID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `aboutID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `announcementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `credential`
--
ALTER TABLE `credential`
  MODIFY `credID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
