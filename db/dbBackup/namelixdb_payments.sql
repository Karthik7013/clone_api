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
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` varchar(15) NOT NULL,
  `policy_id` varchar(15) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_status` enum('Success','Failed','Pending') DEFAULT NULL,
  `payment_mode` enum('Cash','Card','UPI','Netbanking','Other') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `currency` varchar(10) DEFAULT 'INR',
  PRIMARY KEY (`payment_id`),
  KEY `policy_id` (`policy_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`policy_id`) REFERENCES `policies` (`policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES ('PAY001','POL001',150.00,'2023-01-05','Success','Card','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY002','POL002',200.00,'2023-02-20','Pending','UPI','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY003','POL003',250.00,'2023-03-25','Success','Netbanking','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY004','POL004',75.00,'2023-04-12','Failed','Cash','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY005','POL005',300.00,'2023-05-15','Success','Card','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY006','POL006',150.00,'2023-06-05','Success','UPI','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY007','POL007',220.00,'2023-07-15','Pending','Netbanking','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY008','POL008',270.00,'2023-08-10','Success','Cash','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY009','POL009',90.00,'2023-09-20','Failed','Card','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY010','POL010',320.00,'2023-10-15','Success','UPI','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY011','POL011',140.00,'2023-01-20','Success','Netbanking','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY012','POL012',190.00,'2023-02-25','Pending','Cash','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY013','POL013',260.00,'2023-03-30','Success','Card','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY014','POL014',80.00,'2023-04-25','Failed','UPI','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY015','POL015',310.00,'2023-05-20','Success','Netbanking','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY016','POL016',160.00,'2023-06-10','Success','Cash','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY017','POL017',230.00,'2023-07-30','Pending','Card','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY018','POL018',280.00,'2023-08-25','Success','UPI','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY019','POL019',85.00,'2023-09-15','Failed','Netbanking','2024-10-21 19:05:26','2024-10-21 19:05:26','INR'),('PAY020','POL020',330.00,'2023-10-05','Success','Cash','2024-10-21 19:05:26','2024-10-21 19:05:26','INR');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
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