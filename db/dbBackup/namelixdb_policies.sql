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
-- Table structure for table `policies`
--

DROP TABLE IF EXISTS `policies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policies` (
  `policy_id` varchar(15) NOT NULL,
  `policy_type` varchar(50) NOT NULL,
  `customer_id` varchar(10) DEFAULT NULL,
  `agent_id` varchar(10) DEFAULT NULL,
  `employee_id` varchar(10) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `premium_amount` decimal(10,2) NOT NULL,
  `coverage_amount` decimal(10,2) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mode` enum('ONLINE','OFFLINE') NOT NULL,
  PRIMARY KEY (`policy_id`),
  KEY `customer_id` (`customer_id`),
  KEY `agent_id` (`agent_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `policies_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `policies_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`agent_id`),
  CONSTRAINT `policies_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policies`
--

LOCK TABLES `policies` WRITE;
/*!40000 ALTER TABLE `policies` DISABLE KEYS */;
INSERT INTO `policies` VALUES ('POL001','Health Insurance','C001','A001',NULL,'2023-01-01','2024-01-01',150.00,10000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL002','Auto Insurance','C002',NULL,'E001','2023-02-15','2024-02-15',200.00,15000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL003','Home Insurance','C003','A001',NULL,'2023-03-20','2024-03-20',250.00,20000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL004','Travel Insurance','C004',NULL,'E002','2023-04-10','2024-04-10',75.00,5000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL005','Life Insurance','C005',NULL,NULL,'2023-05-05','2025-05-05',300.00,100000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL006','Health Insurance','C006',NULL,'E003','2023-06-01','2024-06-01',150.00,10000.00,'inactive','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL007','Auto Insurance','C007','A001',NULL,'2023-07-20','2024-07-20',220.00,18000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL008','Home Insurance','C008',NULL,NULL,'2023-08-15','2024-08-15',270.00,22000.00,'inactive','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL009','Travel Insurance','C009','A001',NULL,'2023-09-25','2024-09-25',90.00,6000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL010','Life Insurance','C010',NULL,'E004','2023-10-10','2025-10-10',320.00,120000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL011','Health Insurance','C011',NULL,NULL,'2023-01-12','2024-01-12',140.00,9500.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL012','Auto Insurance','C012','A001','E005','2023-02-18','2024-02-18',190.00,16000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL013','Home Insurance','C013',NULL,NULL,'2023-03-25','2024-03-25',260.00,21000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL014','Travel Insurance','C014',NULL,'E006','2023-04-15','2024-04-15',80.00,4500.00,'inactive','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL015','Life Insurance','C015','A001',NULL,'2023-05-10','2025-05-10',310.00,110000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL016','Health Insurance','C016',NULL,'E007','2023-06-05','2024-06-05',160.00,10500.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL017','Auto Insurance','C017',NULL,NULL,'2023-07-25','2024-07-25',230.00,17500.00,'inactive','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL018','Home Insurance','C018','A001',NULL,'2023-08-20','2024-08-20',280.00,23000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE'),('POL019','Travel Insurance','C019',NULL,'E008','2023-09-30','2024-09-30',85.00,5500.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','ONLINE'),('POL020','Life Insurance','C020',NULL,NULL,'2023-10-05','2025-10-05',330.00,125000.00,'active','2024-10-21 19:00:13','2024-10-21 19:00:13','OFFLINE');
/*!40000 ALTER TABLE `policies` ENABLE KEYS */;
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
