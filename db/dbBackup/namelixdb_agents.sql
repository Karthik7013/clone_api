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
-- Table structure for table `agents`
--

DROP TABLE IF EXISTS `agents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agents` (
  `agent_id` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` bigint NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `pincode` char(6) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `examdate` date DEFAULT NULL,
  `examscore` int DEFAULT NULL,
  `isexampass` enum('Yes','No') DEFAULT 'No',
  `attemptsleft` int DEFAULT '3',
  `hiredate` date DEFAULT NULL,
  `license_number` varchar(20) DEFAULT NULL,
  `commission_rate` decimal(5,2) DEFAULT NULL,
  `status` enum('Active','Inactive','Terminated') DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `refered_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`agent_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  KEY `refered_by` (`refered_by`),
  CONSTRAINT `agents_ibfk_1` FOREIGN KEY (`refered_by`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `agents_chk_1` CHECK (((`phone` >= 1000000000) and (`phone` <= 9999999999))),
  CONSTRAINT `agents_chk_2` CHECK ((`examscore` between 0 and 100)),
  CONSTRAINT `agents_chk_3` CHECK ((`attemptsleft` between 0 and 3)),
  CONSTRAINT `agents_chk_4` CHECK (((`commission_rate` >= 0) and (`commission_rate` <= 100)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agents`
--

LOCK TABLES `agents` WRITE;
/*!40000 ALTER TABLE `agents` DISABLE KEYS */;
INSERT INTO `agents` VALUES ('A001','John','Doe',9876543210,'john.doe@example.com','1985-06-15','Male','123 Main St','California','Los Angeles','90001','USA','2023-01-10',85,'Yes',3,'2022-05-01','L123456',10.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03',NULL),('A002','Jane','Smith',9876543211,'jane.smith@example.com','1990-02-20','Female','456 Maple Ave','New York','New York','10001','USA','2023-01-12',92,'Yes',3,'2022-06-15','L123457',12.50,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E001'),('A003','Emily','Johnson',9876543212,'emily.johnson@example.com','1987-03-30','Female','789 Oak Dr','Texas','Austin','73301','USA','2023-01-15',76,'Yes',3,'2022-07-20','L123458',8.75,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E002'),('A004','Michael','Brown',9876543213,'michael.brown@example.com','1983-11-05','Male','321 Pine Rd','Florida','Miami','33101','USA','2023-01-18',68,'No',2,'2022-04-10','L123459',9.50,'Inactive','2024-10-21 17:51:03','2024-10-21 17:51:03',NULL),('A005','Linda','Davis',9876543214,'linda.davis@example.com','1995-07-22','Female','654 Cedar Ct','Illinois','Chicago','60601','USA','2023-01-20',95,'Yes',3,'2022-03-12','L123460',15.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E001'),('A006','Robert','Garcia',9876543215,'robert.garcia@example.com','1992-08-13','Male','987 Birch Blvd','Nevada','Las Vegas','89101','USA','2023-01-25',89,'Yes',3,'2022-02-18','L123461',11.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E003'),('A007','Jessica','Martinez',9876543216,'jessica.martinez@example.com','1980-12-02','Female','159 Elm St','Arizona','Phoenix','85001','USA','2023-02-05',77,'Yes',2,'2022-01-14','L123462',10.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E002'),('A008','William','Hernandez',9876543217,'william.hernandez@example.com','1989-04-16','Male','753 Walnut St','Georgia','Atlanta','30301','USA','2023-02-10',85,'Yes',3,'2022-08-22','L123463',14.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E003'),('A009','Sophia','Lopez',9876543218,'sophia.lopez@example.com','1994-09-25','Female','258 Spruce St','Washington','Seattle','98101','USA','2023-02-12',90,'Yes',3,'2022-09-05','L123464',13.50,'Inactive','2024-10-21 17:51:03','2024-10-21 17:51:03',NULL),('A010','James','Wilson',9876543219,'james.wilson@example.com','1988-01-19','Male','369 Fir St','Oregon','Portland','97201','USA','2023-02-15',60,'No',1,'2022-10-30','L123465',7.50,'Inactive','2024-10-21 17:51:03','2024-10-21 17:51:03','E001'),('A011','Olivia','Taylor',9876543220,'olivia.taylor@example.com','1991-10-03','Female','147 Ash St','Ohio','Columbus','43201','USA','2023-02-20',88,'Yes',3,'2022-11-15','L123466',12.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03',NULL),('A012','Benjamin','Anderson',9876543221,'benjamin.anderson@example.com','1986-05-09','Male','258 Maple St','Michigan','Detroit','48201','USA','2023-02-22',84,'Yes',3,'2022-12-25','L123467',10.50,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E002'),('A013','Mia','Thomas',9876543222,'mia.thomas@example.com','1993-06-12','Female','369 Oak St','Virginia','Richmond','23201','USA','2023-02-28',91,'Yes',3,'2022-03-30','L123468',14.50,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E003'),('A014','Elijah','Jackson',9876543223,'elijah.jackson@example.com','1984-07-28','Male','159 Pine St','Tennessee','Nashville','37201','USA','2023-03-05',78,'No',2,'2022-08-01','L123469',9.00,'Inactive','2024-10-21 17:51:03','2024-10-21 17:51:03',NULL),('A015','Ava','White',9876543224,'ava.white@example.com','1992-11-30','Female','753 Cedar St','North Carolina','Charlotte','28201','USA','2023-03-10',96,'Yes',3,'2022-09-10','L123470',15.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E001'),('A016','Liam','Harris',9876543225,'liam.harris@example.com','1990-12-15','Male','456 Birch St','Massachusetts','Boston','02101','USA','2023-03-15',72,'No',1,'2022-07-22','L123471',8.50,'Inactive','2024-10-21 17:51:03','2024-10-21 17:51:03','E003'),('A017','Isabella','Clark',9876543226,'isabella.clark@example.com','1985-04-11','Female','987 Elm St','New Jersey','Newark','07101','USA','2023-03-20',80,'Yes',3,'2022-05-05','L123472',11.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03',NULL),('A018','Lucas','Lewis',9876543227,'lucas.lewis@example.com','1997-09-07','Male','258 Spruce St','Arizona','Tucson','85701','USA','2023-03-25',64,'No',0,'2022-04-12','L123473',6.00,'Inactive','2024-10-21 17:51:03','2024-10-21 17:51:03','E002'),('A019','Charlotte','Lee',9876543228,'charlotte.lee@example.com','1994-01-22','Female','369 Pine St','Washington','Spokane','99201','USA','2023-04-01',82,'Yes',3,'2022-06-05','L123474',13.00,'Active','2024-10-21 17:51:03','2024-10-21 17:51:03','E003'),('A020','Mason','Walker',9876543229,'mason.walker@example.com','1991-03-28','Male','147 Oak St','Illinois','Springfield','62701','USA','2023-04-10',71,'No',1,'2022-02-20','L123475',7.00,'Inactive','2024-10-21 17:51:03','2024-10-21 17:51:03','E001');
/*!40000 ALTER TABLE `agents` ENABLE KEYS */;
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
