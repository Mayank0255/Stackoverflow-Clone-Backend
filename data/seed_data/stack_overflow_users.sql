-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: stack_overflow
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gravatar` varchar(255) NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('483198ed-01de-4aff-9c55-a819271e46a7','shubh','$2a$10$z6O1Rpd6wlDKt03dePOTo.PMxH2VvDXy4itjcdk6FH/Fictrh660W','https://secure.gravatar.com/avatar/77?s=164&d=identicon',0,'2022-02-22 17:49:41','2022-02-22 17:49:41'),('64d34159-52cc-4ff8-8609-b8eef9d42d69','harshal','$2a$10$4jKcvNX24bYggNvkOtqOKOPdMOJhoq/EontgTY0JXPHuIy/JD6W5W','https://secure.gravatar.com/avatar/5?s=164&d=identicon',0,'2022-02-22 17:49:31','2022-02-22 17:49:31'),('88a24a94-8a6f-41cb-968d-0f7bb9e70e9d','aarsh','$2a$10$J33YX./Y6egb2knTJYPAlOYXXOkhERlpVamvQTIyPSKaWcklePT6a','https://secure.gravatar.com/avatar/88?s=164&d=identicon',0,'2022-02-22 17:50:16','2022-02-22 17:50:16'),('907a2032-ba37-4784-aad4-bd2764d631e8','rithik','$2a$10$K423U2rlf.b9.FIj70g54ei9MtKkcA0f9cPvm7UO2ajFy.7wqXZfO','https://secure.gravatar.com/avatar/60?s=164&d=identicon',0,'2022-02-22 17:49:22','2022-02-22 17:49:22'),('9969539d-1057-4b59-b03a-c73cffbe575d','hritik','$2a$10$EgCWewInvCKj5s4qbVXohe5P3kLcCqbIHwguv40Xe7mhE5Ou5Na2u','https://secure.gravatar.com/avatar/8?s=164&d=identicon',0,'2022-02-22 17:51:05','2022-02-22 17:51:05'),('a210dae5-20f5-42bf-9bba-03433f7e1fc8','rajarshee','$2a$10$fTeDXhR0jLqUpoOW42vSLu6EcBa5eWvtjjyr0pSzk5Bxb5z4.CvJC','https://secure.gravatar.com/avatar/80?s=164&d=identicon',0,'2022-02-22 17:50:00','2022-02-22 17:50:00'),('b3fd5056-fd6b-4453-91cf-d1c015333867','jaidev','$2a$10$.N6tBKw5/prwHFYVC5Y3iufqqqzJOFt9tf6/k7NrMJBa7v1BnUqNe','https://secure.gravatar.com/avatar/78?s=164&d=identicon',0,'2022-02-22 17:49:50','2022-02-22 17:49:50'),('c9fa9727-c3bf-4823-b918-73300ab67afa','mayank','$2a$10$hX6pNZYhaoTCsHKlJXWqDuFTaU1VNE0RLOV/XxGkzQSXvMZhm3Ci.','https://secure.gravatar.com/avatar/71?s=164&d=identicon',0,'2022-02-21 18:40:07','2022-02-21 18:40:07'),('f39238a4-90df-4cf6-9ab1-fdd43a380532','vansh','$2a$10$U4VwWNpizmMujrnUHpan0OIMxd9qLXhD8CY/XpwkJaY/PAbHOsVcK','https://secure.gravatar.com/avatar/98?s=164&d=identicon',0,'2022-02-22 17:50:09','2022-02-22 17:50:09');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-22 23:39:47
