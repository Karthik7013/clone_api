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
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` varchar(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `phone` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pincode` char(6) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `salary` decimal(10,2) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `joinedate` date NOT NULL,
  `status` enum('Active','Inactive','Terminated') DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `employees_chk_1` CHECK (((`phone` >= 1000000000) and (`phone` <= 9999999999))),
  CONSTRAINT `employees_chk_2` CHECK ((`salary` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('E001','John','Doe',9876543210,'john.doe@example.com','1990-01-15','Male','123 Elm St','California','Los Angeles','90001','USA',60000.00,'Engineering','Software Engineer','2022-03-10','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E002','Jane','Smith',8765432109,'jane.smith@example.com','1985-05-22','Female','456 Oak St','New York','New York','10001','USA',75000.00,'Marketing','Marketing Manager','2021-07-15','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E003','Emily','Johnson',7654321098,'emily.johnson@example.com','1992-09-30','Female','789 Pine St','Texas','Houston','77001','USA',55000.00,'HR','HR Specialist','2020-01-25','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E004','Michael','Brown',6543210987,'michael.brown@example.com','1988-03-14','Male','321 Maple St','Florida','Miami','33101','USA',72000.00,'Sales','Sales Executive','2019-11-01','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E005','Sarah','Davis',5432109876,'sarah.davis@example.com','1995-12-05','Female','654 Cedar St','Illinois','Chicago','60601','USA',50000.00,'Finance','Accountant','2022-06-20','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E006','David','Martinez',4321098765,'david.martinez@example.com','1987-04-18','Male','987 Birch St','Nevada','Las Vegas','89101','USA',80000.00,'Engineering','Project Manager','2021-08-12','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E007','Jessica','Garcia',3210987654,'jessica.garcia@example.com','1993-07-28','Female','135 Spruce St','Arizona','Phoenix','85001','USA',62000.00,'Marketing','Brand Strategist','2020-05-16','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E008','James','Rodriguez',2109876543,'james.rodriguez@example.com','1982-11-11','Male','246 Fir St','Washington','Seattle','98101','USA',90000.00,'Sales','Sales Manager','2018-04-09','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E009','Amanda','Wilson',1098765432,'amanda.wilson@example.com','1991-08-22','Female','357 Willow St','California','San Francisco','94101','USA',67000.00,'HR','Recruiter','2019-03-15','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E010','Joshua','Lee',1234567890,'joshua.lee@example.com','1989-10-01','Male','468 Chestnut St','New York','Buffalo','14201','USA',85000.00,'Finance','Financial Analyst','2020-09-23','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E011','Ashley','Miller',2345678901,'ashley.miller@example.com','1994-06-30','Female','579 Poplar St','Texas','Austin','73301','USA',59000.00,'Engineering','Data Scientist','2021-02-12','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E012','Matthew','Hernandez',3456789012,'matthew.hernandez@example.com','1986-03-16','Male','680 Sycamore St','Florida','Orlando','32801','USA',72000.00,'Marketing','Content Creator','2021-05-05','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E013','Laura','Young',4567890123,'laura.young@example.com','1992-04-29','Female','791 Maplewood St','Illinois','Naperville','60540','USA',58000.00,'Finance','Payroll Specialist','2020-10-01','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E014','Ryan','Hall',5678901234,'ryan.hall@example.com','1984-02-12','Male','902 Birchwood St','Nevada','Reno','89501','USA',77000.00,'Sales','Business Development Rep','2019-01-14','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E015','Sophia','Lopez',6789012345,'sophia.lopez@example.com','1995-07-25','Female','123 Elmwood St','Arizona','Tucson','85701','USA',64000.00,'HR','Training Coordinator','2021-04-30','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E016','Andrew','Gonzalez',7890123456,'andrew.gonzalez@example.com','1983-10-08','Male','456 Oakwood St','California','San Diego','92101','USA',89000.00,'Engineering','Systems Architect','2018-11-29','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E017','Megan','Martinez',8901234567,'megan.martinez@example.com','1990-09-19','Female','789 Pinewood St','New York','Albany','12201','USA',50000.00,'Marketing','Digital Marketer','2022-07-17','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E018','Ethan','Baker',9012345678,'ethan.baker@example.com','1987-05-13','Male','135 Willowbrook St','Texas','Dallas','75201','USA',74000.00,'Finance','Credit Analyst','2020-12-20','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E019','Isabella','Nelson',9123456780,'isabella.nelson@example.com','1994-01-28','Female','246 Sprucewood St','Florida','Tampa','33601','USA',60000.00,'HR','Employee Relations Specialist','2022-09-14','Active','2024-10-21 17:33:07','2024-10-21 17:33:07'),('E020','Jacob','Carter',8234567890,'jacob.carter@example.com','1981-03-04','Male','357 Firwood St','Nevada','Henderson','89001','USA',83000.00,'Sales','Sales Operations Analyst','2019-06-11','Active','2024-10-21 17:33:07','2024-10-21 17:33:07');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
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
