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
-- Table structure for table `claims`
--

DROP TABLE IF EXISTS `claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claims` (
  `claim_id` varchar(15) NOT NULL,
  `registered_claim_id` varchar(15) NOT NULL,
  `claim_date` date DEFAULT NULL,
  `claim_amount` decimal(10,2) DEFAULT NULL,
  `claim_status` enum('approved','pending','rejected') DEFAULT 'pending',
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`claim_id`),
  KEY `registered_claim_id` (`registered_claim_id`),
  CONSTRAINT `claims_ibfk_1` FOREIGN KEY (`registered_claim_id`) REFERENCES `registered_claims` (`registered_claim_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
INSERT INTO `claims` VALUES ('CLM0001','RCLM0001','2024-01-15',1500.00,'pending','Claim for living room water damage repair.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0002','RCLM0002','2024-01-16',3000.00,'approved','Claim for theft of electronics.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0003','RCLM0003','2024-01-17',2000.00,'pending','Claim for car accident damages.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0004','RCLM0004','2024-01-18',5000.00,'rejected','Claim for kitchen fire damage.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0005','RCLM0005','2024-01-19',1200.00,'approved','Claim for medical bills.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0006','RCLM0006','2024-01-20',3500.00,'pending','Claim for flood-related damage.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0007','RCLM0007','2024-01-21',4000.00,'rejected','Claim for vandalism costs.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0008','RCLM0008','2024-01-22',800.00,'pending','Claim for stolen bicycle.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0009','RCLM0009','2024-01-23',2000.00,'approved','Claim for slip and fall incident.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0010','RCLM0010','2024-01-24',600.00,'pending','Claim for dog bite expenses.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0011','RCLM0011','2024-01-25',5000.00,'approved','Claim for business interruption loss.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0012','RCLM0012','2024-01-26',2500.00,'pending','Claim for vehicle collision repairs.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0013','RCLM0013','2024-01-27',4500.00,'rejected','Claim for storm damage to roof.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0014','RCLM0014','2024-01-28',700.00,'pending','Claim for lost travel luggage.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0015','RCLM0015','2024-01-29',3000.00,'approved','Claim for property damage.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0016','RCLM0016','2024-01-30',1500.00,'pending','Claim for equipment repair.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0017','RCLM0017','2024-01-31',4000.00,'approved','Claim for office fire damage.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0018','RCLM0018','2024-02-01',1000.00,'pending','Claim for identity theft expenses.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0019','RCLM0019','2024-02-02',2500.00,'approved','Claim for personal injury at home.','2024-10-22 01:50:08','2024-10-22 01:50:08'),('CLM0020','RCLM0020','2024-02-03',6000.00,'rejected','Claim for earthquake damage.','2024-10-22 01:50:08','2024-10-22 01:50:08');
/*!40000 ALTER TABLE `claims` ENABLE KEYS */;
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
