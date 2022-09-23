-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 24, 2022 at 01:11 AM
-- Server version: 8.0.30-0ubuntu0.22.04.1
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `Appointments`
--

CREATE TABLE `Appointments` (
  `AppointmentID` int NOT NULL,
  `PatientID` int DEFAULT NULL,
  `Schedule` datetime DEFAULT NULL,
  `ServiceID` int DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `CreatedDate` date DEFAULT NULL,
  `Notes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Medicines`
--

CREATE TABLE `Medicines` (
  `MedicineID` int NOT NULL,
  `StaffID` int DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Stocks` int DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Size` double DEFAULT NULL,
  `DateEntry` date DEFAULT NULL,
  `ExpiryDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Patients`
--

CREATE TABLE `Patients` (
  `PatientID` int NOT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `Gender` varchar(20) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `CreatedDate` date DEFAULT NULL,
  `BirthDate` date DEFAULT NULL,
  `MiddleName` varchar(50) DEFAULT NULL,
  `Suffix` varchar(10) DEFAULT NULL,
  `Street` varchar(255) DEFAULT NULL,
  `Baranggay` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `ProfilePicture` longblob,
  `ImageID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Patients`
--

INSERT INTO `Patients` (`PatientID`, `LastName`, `FirstName`, `Gender`, `Phone`, `CreatedDate`, `BirthDate`, `MiddleName`, `Suffix`, `Street`, `Baranggay`, `City`, `ProfilePicture`, `ImageID`) VALUES
(26, 'NEwpatient14', 'NEwpatient14', 'Female', '9231313', '2022-08-23', '2022-09-28', 'hh', 'JR', 'st14', 'brgy14', 'city14', NULL, NULL),
(27, 'Patient27lastname', 'Patient27Firstname', 'Female', '092734324234', '2022-08-23', '2022-09-29', 'PA', 'JR', 'St27', 'baranggay 27', 'city27', NULL, NULL),
(28, 'Aleguiojo', 'ALvs', 'Male', '09312312312312', '2022-08-23', '1997-10-10', 'Tantio', 'None', 'Street Boys', 'Inaywan', 'Cebu City', NULL, NULL),
(29, 'dasdasdasd', 'asd', 'Female', '0932131312', '2022-08-23', '2022-09-27', 'sadd', 'SR', 'dasdasd', 'dasdasd', 'dasd', NULL, NULL),
(30, 'Lastnametest', 'Fnametest', 'Female', '0923123112', '2022-08-23', '2022-09-28', 'T', 'SR', 'strt test', 'brgy test', 'city test', NULL, NULL),
(38, 'Aleguiojo', 'Manolito', 'Male', '09232323232', '2022-08-23', '2022-09-29', 'Aledo', 'None', 'Camote', 'Pob 1', 'Carcar City', NULL, NULL),
(39, 'Aleguiojo', 'Ma Victoria', 'Female', '092313123', '2022-08-23', '2022-09-28', 'Tantio', 'None', 'St girls', 'Pardo Pob', 'Cebu CITY', NULL, NULL),
(40, 'Ramirez', 'Freddie', 'Male', '095555555555555555', '2022-08-23', '2022-09-28', 'R', 'SR', 'CITY GREEN', 'MAMBALING', 'CEBU CITY', NULL, NULL),
(41, 'Aleguiojo', 'ALVS', 'Male', '09231312312', '2022-08-24', '2022-09-28', 'T', 'JR', 'Test Street WIith Image', 'Inawayan', 'Cebu', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Appointments`
--
ALTER TABLE `Appointments`
  ADD PRIMARY KEY (`AppointmentID`),
  ADD KEY `PatientID` (`PatientID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- Indexes for table `Medicines`
--
ALTER TABLE `Medicines`
  ADD PRIMARY KEY (`MedicineID`);

--
-- Indexes for table `Patients`
--
ALTER TABLE `Patients`
  ADD PRIMARY KEY (`PatientID`),
  ADD KEY `ImageID` (`ImageID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Appointments`
--
ALTER TABLE `Appointments`
  MODIFY `AppointmentID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Medicines`
--
ALTER TABLE `Medicines`
  MODIFY `MedicineID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Patients`
--
ALTER TABLE `Patients`
  MODIFY `PatientID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Appointments`
--
ALTER TABLE `Appointments`
  ADD CONSTRAINT `Appointments_ibfk_1` FOREIGN KEY (`PatientID`) REFERENCES `Patients` (`PatientID`),
  ADD CONSTRAINT `Appointments_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `Services` (`ServiceID`);

--
-- Constraints for table `Patients`
--
ALTER TABLE `Patients`
  ADD CONSTRAINT `Patients_ibfk_1` FOREIGN KEY (`ImageID`) REFERENCES `Images` (`ImageID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
