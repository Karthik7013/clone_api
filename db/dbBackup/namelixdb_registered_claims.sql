-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: namelixdb
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `registered_claims`
--

DROP TABLE IF EXISTS `registered_claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registered_claims` (
  `registered_claim_id` varchar(15) NOT NULL,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `policy_id` varchar(15) NOT NULL,
  `description` text NOT NULL,
  `registered_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`registered_claim_id`),
  KEY `policy_id` (`policy_id`),
  CONSTRAINT `registered_claims_ibfk_1` FOREIGN KEY (`policy_id`) REFERENCES `policies` (`policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registered_claims`
--

LOCK TABLES `registered_claims` WRITE;
/*!40000 ALTER TABLE `registered_claims` DISABLE KEYS */;
INSERT INTO `registered_claims` VALUES ('RCLM0001','2024-10-22 01:49:19','POL001','Claim for water damage in living room.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0002','2024-10-22 01:49:19','POL002','Claim for theft of personal belongings.','approved','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0003','2024-10-22 01:49:19','POL003','Claim for car accident repair.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0004','2024-10-22 01:49:19','POL001','Claim for fire damage in kitchen.','rejected','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0005','2024-10-22 01:49:19','POL002','Claim for medical expenses.','approved','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0006','2024-10-22 01:49:19','POL004','Claim for flood damage.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0007','2024-10-22 01:49:19','POL003','Claim for vandalism damage.','rejected','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0008','2024-10-22 01:49:19','POL001','Claim for stolen bicycle.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0009','2024-10-22 01:49:19','POL005','Claim for slip and fall accident.','approved','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0010','2024-10-22 01:49:19','POL002','Claim for dog bite incident.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0011','2024-10-22 01:49:19','POL006','Claim for business interruption.','approved','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0012','2024-10-22 01:49:19','POL003','Claim for collision with another vehicle.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0013','2024-10-22 01:49:19','POL001','Claim for roof damage from storm.','rejected','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0014','2024-10-22 01:49:19','POL004','Claim for lost luggage during travel.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0015','2024-10-22 01:49:19','POL005','Claim for property damage.','approved','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0016','2024-10-22 01:49:19','POL006','Claim for equipment breakdown.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0017','2024-10-22 01:49:19','POL003','Claim for fire in office space.','approved','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0018','2024-10-22 01:49:19','POL002','Claim for identity theft.','pending','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0019','2024-10-22 01:49:19','POL001','Claim for personal injury at home.','approved','2024-10-22 01:49:19','2024-10-22 01:49:19'),('RCLM0020','2024-10-22 01:49:19','POL004','Claim for earthquake damage.','rejected','2024-10-22 01:49:19','2024-10-22 01:49:19');
/*!40000 ALTER TABLE `registered_claims` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-22  7:59:20
