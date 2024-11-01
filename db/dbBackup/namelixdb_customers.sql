CREATE DATABASE  IF NOT EXISTS `namelixdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `namelixdb`;
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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` bigint NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `pincode` char(6) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `marital_status` enum('Single','Married','Divorced','Widowed') DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `refered_by_agent` varchar(255) DEFAULT NULL,
  `refered_by_employee` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  KEY `refered_by_agent` (`refered_by_agent`),
  KEY `refered_by_employee` (`refered_by_employee`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`refered_by_agent`) REFERENCES `agents` (`agent_id`),
  CONSTRAINT `customers_ibfk_2` FOREIGN KEY (`refered_by_employee`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `customers_chk_1` CHECK (((`phone` >= 1000000000) and (`phone` <= 9999999999)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('C001','John','Doe',1234567890,'john.doe@example.com','1990-01-01','Male','123 Main St','California','Los Angeles','90001','USA','Single','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A001',NULL),('C002','Jane','Smith',9876543210,'jane.smith@example.com','1985-05-22','Female','456 Oak St','New York','New York','10001','USA','Married','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E001'),('C003','Alice','Johnson',8765432109,'alice.j@example.com','1992-08-30','Female','789 Pine St','Florida','Miami','33101','USA','Single','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A002',NULL),('C004','Bob','Brown',7654321098,'bob.brown@example.com','1988-12-11','Male','321 Cedar St','Texas','Houston','77001','USA','Divorced','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E002'),('C005','Charlie','Davis',6543210987,'charlie.d@example.com','1995-07-04','Male','147 Birch St','Illinois','Chicago','60601','USA','Single','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A003',NULL),('C006','Diana','Wilson',5432109876,'diana.wilson@example.com','1993-11-23','Female','258 Maple St','Nevada','Las Vegas','89101','USA','Married','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E003'),('C007','Eva','Thomas',4321098765,'eva.t@example.com','1980-03-18','Female','369 Spruce St','California','San Diego','92101','USA','Single','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A004',NULL),('C008','Frank','Moore',3210987654,'frank.m@example.com','1987-09-05','Male','147 Elm St','Oregon','Portland','97201','USA','Widowed','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E004'),('C009','Grace','Lee',2109876543,'grace.l@example.com','1991-02-28','Female','258 Oak St','Georgia','Atlanta','30301','USA','Married','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A005',NULL),('C010','Hank','Walker',1098765432,'hank.w@example.com','1983-10-14','Male','369 Pine St','Washington','Seattle','98101','USA','Single','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E005'),('C011','Ivy','Hall',9876543211,'ivy.h@example.com','1989-06-16','Female','147 Cedar St','Texas','Dallas','75201','USA','Divorced','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A006',NULL),('C012','Jack','Young',8765432100,'jack.y@example.com','1994-04-20','Male','258 Birch St','New York','Buffalo','14201','USA','Single','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E006'),('C013','Kathy','Hernandez',7654321099,'kathy.h@example.com','1986-12-05','Female','369 Maple St','Florida','Orlando','32801','USA','Married','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A007',NULL),('C014','Leo','King',6543210988,'leo.k@example.com','1992-01-22','Male','147 Spruce St','Nevada','Reno','89501','USA','Widowed','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E007'),('C015','Mia','Lopez',5432109877,'mia.l@example.com','1988-08-19','Female','258 Elm St','Illinois','Springfield','62701','USA','Divorced','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A008',NULL),('C016','Nina','Gonzalez',4321098766,'nina.g@example.com','1990-07-29','Female','369 Oak St','California','San Francisco','94101','USA','Single','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E008'),('C017','Oscar','Martinez',3210987655,'oscar.m@example.com','1981-05-17','Male','147 Pine St','Georgia','Savannah','31401','USA','Married','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A009',NULL),('C018','Paul','Anderson',2109876544,'paul.a@example.com','1993-03-10','Male','258 Cedar St','Texas','Austin','73301','USA','Single','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E009'),('C019','Quinn','Taylor',1098765433,'quinn.t@example.com','1984-09-21','Female','369 Birch St','Florida','Tampa','33601','USA','Married','Active','2024-10-22 00:01:57','2024-10-21 18:31:57','A010',NULL),('C020','Rita','Thomas',9876543212,'rita.t@example.com','1987-10-30','Female','147 Maple St','California','San Jose','95101','USA','Divorced','Active','2024-10-22 00:01:57','2024-10-21 18:31:57',NULL,'E010');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01  2:27:13
