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
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(255) DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `agent_id` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_agent` varchar(50) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `employee_id` (`employee_id`),
  KEY `agent_id` (`agent_id`),
  CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `refresh_token_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `refresh_token_ibfk_3` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`agent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (5,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMDUzMiwiZXhwIjoxNzMwMzE1MzMyfQ.YLlbcRmpsQOGLDuQ_Yc1YRvDvp0rWBI1CrooRS0sYUs','2024-10-24 00:38:52','2024-10-24 00:38:52','PostmanRuntime/7.42.0','::1'),(6,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMDg2MSwiZXhwIjoxNzMwMzE1NjYxfQ.Y3IRwIn7M4Bmj7xXGDazZnZdx9if5X55VaWAF7aOSoA','2024-10-24 00:44:21','2024-10-24 00:44:21','PostmanRuntime/7.42.0','::1'),(7,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMTA1MCwiZXhwIjoxNzMwMzE1ODUwfQ._aaIlglAtZ6mC3YCzV1vPg_vqAb_XsyD5z_nDTRlzJY','2024-10-24 00:47:30','2024-10-24 00:47:30','PostmanRuntime/7.42.0','::1'),(8,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMTE4OSwiZXhwIjoxNzMwMzE1OTg5fQ.rfd9fMSz-Qq1XcYrPeb2aY4AT35PRy6-JPoVnBwRpmo','2024-10-24 00:49:49','2024-10-24 00:49:49','PostmanRuntime/7.42.0','::1'),(9,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMTIzNiwiZXhwIjoxNzMwMzE2MDM2fQ.fv-h3g39dsdwoCdPP8n8IMJMgBANpG7eHw6uBEOrUCA','2024-10-24 00:50:36','2024-10-24 00:50:36','PostmanRuntime/7.42.0','::1'),(10,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMTMwMCwiZXhwIjoxNzMwMzE2MTAwfQ.ivSG5ogxKljwtEHwDTQxYX8670zFOj5E7UogHwihjMs','2024-10-24 00:51:41','2024-10-24 00:51:40','PostmanRuntime/7.42.0','::1'),(11,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMTgwNiwiZXhwIjoxNzMwMzE2NjA2fQ.3vzhp0fycAZ0aq8H1FGcgKjR-dRpz4SEZW0LetukwSw','2024-10-24 01:00:06','2024-10-24 01:00:06','PostmanRuntime/7.42.0','::1'),(12,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMjcyMCwiZXhwIjoxNzMwMzE3NTIwfQ.q8Z72zXGtBCOcQMefSRdD2KHdOqoqykiT6nBAxQT7Xo','2024-10-24 01:15:20','2024-10-24 01:15:20','PostmanRuntime/7.42.0','::1'),(13,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMzI2MywiZXhwIjoxNzMwMzE4MDYzfQ.AlrDJXDWDTBvI1jHz95NjCMPly4sDuTGcMWTbAQ3lT8','2024-10-24 01:24:23','2024-10-24 01:24:23','PostmanRuntime/7.42.0','::1'),(14,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMzI5NywiZXhwIjoxNzMwMzE4MDk3fQ.c1VbedihLTxUX2Yrx-5dMRTeC2KDSvLDePQwu14tYDE','2024-10-24 01:24:58','2024-10-24 01:24:57','PostmanRuntime/7.42.0','::1'),(15,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMzMyNiwiZXhwIjoxNzMwMzE4MTI2fQ.7aH-Pq-yaLrYwMtiV7wVzdr1sdx1JW3WsiK_1QQUxFI','2024-10-24 01:25:26','2024-10-24 01:25:26','PostmanRuntime/7.42.0','::1'),(16,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxMzM5OCwiZXhwIjoxNzMwMzE4MTk4fQ.P65BxVRXho2uJ9adTQ99gu3-DTy47TihDVWq2kjGV78','2024-10-24 01:26:39','2024-10-24 01:26:38','PostmanRuntime/7.42.0','::1'),(17,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxNDAzMywiZXhwIjoxNzMwMzE4ODMzfQ.sqOf4V5Kgwg74qFukbLvjTlpkDM624bq1UtaqfXwZEE','2024-10-24 01:37:13','2024-10-24 01:37:13','PostmanRuntime/7.42.0','::1'),(18,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxNDEyMCwiZXhwIjoxNzMwMzE4OTIwfQ.rSYajM2eMxIWIeQmFtdtT2DS-F_CUOxacb11IMnDqmY','2024-10-24 01:38:40','2024-10-24 01:38:40','PostmanRuntime/7.42.0','::1'),(19,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxNDM3MiwiZXhwIjoxNzMwMzE5MTcyfQ.GWhjxs7EzZAm0439mIrVhHepqXe68--0kJl4FMaoa-8','2024-10-24 01:42:53','2024-10-24 01:42:52','PostmanRuntime/7.42.0','::1'),(20,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxNTA1MCwiZXhwIjoxNzMwMzE5ODUwfQ.e9zSFUMZ5QkMObKC_ZL7KibbQQloe-DezMjiDC0dho8','2024-10-24 01:54:11','2024-10-24 01:54:10','PostmanRuntime/7.42.0','::1'),(21,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxNTY0MywiZXhwIjoxNzMwMzIwNDQzfQ.9YoSuRuwrde71t-Zijt1fdsJnkdoKvRFktAUTuJyih4','2024-10-24 02:04:04','2024-10-24 02:04:03','PostmanRuntime/7.42.0','::1'),(22,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxNzUzNiwiZXhwIjoxNzMwMzIyMzM2fQ.K8NbI5ljcIShsTU6Zov9BKCKxZHRTNYI6UAMLkt-rqA','2024-10-24 02:35:36','2024-10-24 02:35:36','PostmanRuntime/7.42.0','::1'),(23,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxNzU0OSwiZXhwIjoxNzMwMzIyMzQ5fQ.xH1XWKH0lKhWzXKeVs2mui1pWiMlxd_obeXMJjKTLfg','2024-10-24 02:35:50','2024-10-24 02:35:49','PostmanRuntime/7.42.0','::1'),(24,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTcxODA2NSwiZXhwIjoxNzMwMzIyODY1fQ.Z8x-Tkludk-vXRnuWSTOyYr2vo53K8Am0x-RGzS9eOI','2024-10-24 02:44:25','2024-10-24 02:44:25','PostmanRuntime/7.42.0','::1'),(25,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTc3ODI1MCwiZXhwIjoxNzMwMzgzMDUwfQ.0ERixCo9ZLgsLFgT51h6r3dMy0URIvlK6QDRpdO5L5o','2024-10-24 19:27:31','2024-10-24 19:27:30','PostmanRuntime/7.42.0','::1'),(26,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTc4MDA4NiwiZXhwIjoxNzMwMzg0ODg2fQ.aZ56EGNx-SSgUIHQNBiHIN7Mw73pDp9yk6og4Ebd024','2024-10-24 19:58:06','2024-10-24 19:58:06','PostmanRuntime/7.42.0','::1'),(27,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTc4MDY0MywiZXhwIjoxNzMwMzg1NDQzfQ.2O7a9oXP0FkNCuOF19MaaSe0H9vo9-AWm-lzj3EgaaM','2024-10-24 20:07:23','2024-10-24 20:07:23','PostmanRuntime/7.42.0','::1'),(28,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTc4MDY5OCwiZXhwIjoxNzMwMzg1NDk4fQ.bUrrH7KVq2nhm5pYlTgwpz_vyOazdrVJWhtmJWvOqBQ','2024-10-24 20:08:18','2024-10-24 20:08:18','PostmanRuntime/7.42.0','::1'),(29,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTc4MDg4NywiZXhwIjoxNzMwMzg1Njg3fQ.MbHWv752Hi0cd_LI_ASpVsxQzOk-ZlDr6Oa8akE5KAg','2024-10-24 20:11:28','2024-10-24 20:11:27','PostmanRuntime/7.42.0','::1'),(31,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MTkyOCwiZXhwIjoxNzMwMzg2NzI4fQ.FcOF6JFcF58MVRrjpnyibq7hs6pqQxL0fS8oynqqSJw','2024-10-24 20:28:49','2024-10-24 20:28:48','PostmanRuntime/7.42.0','::1'),(32,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MTk0NCwiZXhwIjoxNzMwMzg2NzQ0fQ.BVsxWXFvVDw-Dtfv9tz_05U0oTWYXOGNPvEBjXM8q2k','2024-10-24 20:29:04','2024-10-24 20:29:04','PostmanRuntime/7.42.0','::1'),(33,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MjE4MCwiZXhwIjoxNzMwMzg2OTgwfQ.XM8eanAUoD4v5MFj9oiniNVL9ESWnmhTclPxdZp-SPU','2024-10-24 20:33:00','2024-10-24 20:33:00','PostmanRuntime/7.42.0','::1'),(34,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MjI5NiwiZXhwIjoxNzMwMzg3MDk2fQ.dcINW7N6WYL_oYznKUhgyLFQZmpzncqtJEp683BB9Lg','2024-10-24 20:34:56','2024-10-24 20:34:56','PostmanRuntime/7.42.0','::1'),(35,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MjM4MSwiZXhwIjoxNzMwMzg3MTgxfQ.7_L_EnTktH9X6E9uXtnqSVmKik9Wo_i--7ku0hgOKGQ','2024-10-24 20:36:21','2024-10-24 20:36:21','PostmanRuntime/7.42.0','::1'),(36,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MjUyNiwiZXhwIjoxNzMwMzg3MzI2fQ.C3dWIJAiRhs2nUtgZthCq8n4wMnvwZsf5FKbepjNLo8','2024-10-24 20:38:46','2024-10-24 20:38:46','PostmanRuntime/7.42.0','::1'),(37,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MjYwNSwiZXhwIjoxNzMwMzg3NDA1fQ.p_s3Xt9GSubisD1cUq9nPzv7bpt5ln3uK-p4J16huUk','2024-10-24 20:40:06','2024-10-24 20:40:05','PostmanRuntime/7.42.0','::1'),(38,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4Mjc3OSwiZXhwIjoxNzMwMzg3NTc5fQ.cDPMTV0SeO_wCjiyhALRcjrAMWLhT-7gOOXqS3AVkus','2024-10-24 20:42:59','2024-10-24 20:42:59','PostmanRuntime/7.42.0','::1'),(39,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4Mjk3OSwiZXhwIjoxNzMwMzg3Nzc5fQ.XNwIh4b6Pqgx5gBm3pRpStv48NVw3BBJmyrBUH3D1BY','2024-10-24 20:46:19','2024-10-24 20:46:19','PostmanRuntime/7.42.0','::1'),(40,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MzAyOCwiZXhwIjoxNzMwMzg3ODI4fQ.Fy9ANG2eUXuoYGR0yE1rF83omAQtPBUfeH28zBJ_79c','2024-10-24 20:47:08','2024-10-24 20:47:08','PostmanRuntime/7.42.0','::1'),(41,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MzA4NSwiZXhwIjoxNzMwMzg3ODg1fQ.eW8fkY-SUaODawLpdCcFg-lp5ta8F2zVyg9a9LOmXG0','2024-10-24 20:48:05','2024-10-24 20:48:05','PostmanRuntime/7.42.0','::1'),(42,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTcyOTc4MzEyMiwiZXhwIjoxNzMwMzg3OTIyfQ.wpdRBspKMLytDCUr5ORgJtqMn3f-q6Vgj5GmornJPU8','2024-10-24 20:48:43','2024-10-24 20:48:42','PostmanRuntime/7.42.0','::1'),(43,NULL,'E001',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiRTAwMSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcyOTc5MDA2NCwiZXhwIjoxNzMwMzk0ODY0fQ.-f05G4YOWFb0etLKmxiYBZP7ZNFkyLJSGCWqy_1rUIE','2024-10-24 22:44:24','2024-10-24 22:44:24','PostmanRuntime/7.42.0','::1'),(49,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTg3ODkwNywiZXhwIjoxNzMwNDgzNzA3fQ.903e-pZb6yB-uoY30McHFXeHljt5Djg_NDDdYsZuYKY','2024-10-25 23:25:08','2024-10-25 23:25:07','PostmanRuntime/7.42.0','::1'),(50,'C002',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwMiIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTk2NzcyOCwiZXhwIjoxNzMwNTcyNTI4fQ.DP3FcjHfB-lZBZ1urxSoUTRfP7R-gifpKu-IKYgNQJI','2024-10-27 00:05:29','2024-10-27 00:05:28','PostmanRuntime/7.42.0','::1'),(52,'C004',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwNCIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTk3NDk4NSwiZXhwIjoxNzMwNTc5Nzg1fQ.TWGugGuex1UB6fCvgcb7lOr6Dl-eNbm_pBLeGk4kRk4','2024-10-27 02:06:25','2024-10-27 02:06:25','PostmanRuntime/7.42.0','::1'),(53,'C004',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwNCIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTk3NjYwMCwiZXhwIjoxNzMwNTgxNDAwfQ.ZsQi7nXA112l91FVi9Q524pFVAFHjiKmbsZMXeLKxRM','2024-10-27 02:33:20','2024-10-27 02:33:20','PostmanRuntime/7.42.0','::1'),(54,'C004',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwNCIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTczMDAxMjE5MywiZXhwIjoxNzMwNjE2OTkzfQ.POWTw0qAeRL2gfC4KkmCDLql9O4EepP057g0p08JTF4','2024-10-27 12:26:33','2024-10-27 12:26:33','PostmanRuntime/7.42.0','::1'),(55,'C004',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQzAwNCIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTczMDAzMjY4NiwiZXhwIjoxNzMwNjM3NDg2fQ.mv-PCAXJUDzjgn50ZaXyPSzft176AU00jN4OmUjebYI','2024-10-27 18:08:06','2024-10-27 18:08:06','PostmanRuntime/7.42.0','::1'),(56,NULL,NULL,'A005','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiQTAwNSIsInR5cGUiOiJhZ2VudCIsImlhdCI6MTczMDQwMTMwNSwiZXhwIjoxNzMxMDA2MTA1fQ.kGulnbZMHy_WImTQzFlOXXnqT2iZxNrJDWU1V0m6cKU','2024-11-01 00:31:46','2024-11-01 00:31:45','PostmanRuntime/7.42.0','::1');
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
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
