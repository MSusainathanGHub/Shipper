-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: shipapp
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `studentname` varchar(255) NOT NULL,
  `mobilenumber` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'marie susainthan','9876789987','chennai'),(2,'markrexon','87656787','cuudalore');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `schemaName` varchar(255) DEFAULT NULL,
  `role` enum('USER','ADMIN','SUPERADMIN') NOT NULL,
  `deleted` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('5129b359-8b18-48eb-8f79-01b32e1a8dc7','mark@gmail.com','mark@gmail.com','ca868b6b20d57e41f1485665408ee203c13019c809e588d92193c831b63c0ffdfd55572a6b93a53f42ed9a5b22daf83f',NULL,NULL,'ADMIN',0,'2024-03-02 13:59:30','2024-03-02 13:59:30',NULL),('9f35360f-98d4-4eb2-9ec0-f0029f177d2a','marie','marie@gmail.com','7f1e5733f765b7821cbca61cfd98d26441ee028a64aa7d403a205f1abbb0afc8b0cd5454ae3d118065082a59880838c5','5129b359-8b18-48eb-8f79-01b32e1a8dc7','student','USER',0,'2024-03-02 16:34:19','2024-03-02 16:34:19',NULL),('a2ab2daa-98fd-4763-8ece-7367ebd93924','appu','appu@gmail.com','072e6e6d9e8b187e227adea2ac24106c0aba9ebbf5fdca912b2e0077f1dab01ba8ecbe6dd7702eff56fe4d5a92d2c849','5129b359-8b18-48eb-8f79-01b32e1a8dc7','vehicle','USER',0,'2024-03-03 06:06:16','2024-03-03 06:06:16',NULL),('a6cea328-e23b-43f6-8c47-9ea441e35339','demouser','demo@gmail.com','4723953f22eefdac34f235a87acc3d00350147dcaa7903e4fa4835de32c9d754b80e56f3758766b3f4c90698e0b1ba27','5129b359-8b18-48eb-8f79-01b32e1a8dc7','ellan','USER',0,'2024-03-03 06:51:15','2024-03-03 06:51:15',NULL),('c77fb449-ea48-4013-b399-a52d3ea198dc','marktested','marktested@gmail.com','5012bec340d2570fe44b90405b50ffa5588e46b19f29a943e5e2ef175e5194fabd7b1baca6884211dc23aface18ebe18','5129b359-8b18-48eb-8f79-01b32e1a8dc7','','USER',0,'2024-03-02 14:27:32','2024-03-02 14:27:32',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `Fueltype` varchar(255) DEFAULT NULL,
  `Amount` int DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'white petrol',1000),(2,'black petorl',200);
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-03 22:30:09
