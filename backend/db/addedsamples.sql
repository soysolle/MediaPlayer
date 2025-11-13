-- MySQL dump 10.13  Distrib 9.0.1, for macos15.1 (arm64)
--
-- Host: localhost    Database: media-player
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_name`),
  UNIQUE KEY `name` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('애니메이션');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `video_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `likes` int DEFAULT '0',
  `content` text NOT NULL,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `marked_time` time DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `video_id` (`video_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (7,29,1,0,'dsf','2024-12-10 20:20:49','00:01:23'),(8,29,1,0,'dsf','2024-12-10 20:20:59',NULL),(9,29,1,0,'dsf','2024-12-10 20:24:55',NULL),(10,29,1,0,'dsf','2024-12-10 20:24:56',NULL),(11,29,1,0,'dsf','2024-12-10 20:27:16',NULL),(12,29,1,0,'dsf','2024-12-10 20:27:27',NULL),(13,29,1,0,'dsf','2024-12-10 20:34:13',NULL);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_like`
--

DROP TABLE IF EXISTS `comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_like` (
  `comment_like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `comment_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_like_id`),
  UNIQUE KEY `user_id` (`user_id`,`comment_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `comment_like_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_like`
--

LOCK TABLES `comment_like` WRITE;
/*!40000 ALTER TABLE `comment_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `History`
--

DROP TABLE IF EXISTS `History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `History` (
  `user_id` int NOT NULL,
  `video_id` int NOT NULL,
  `playback_pos` time DEFAULT '00:00:00',
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `History`
--

LOCK TABLES `History` WRITE;
/*!40000 ALTER TABLE `History` DISABLE KEYS */;
INSERT INTO `History` VALUES (1,1,'00:12:11','2024-12-09 21:26:28');
/*!40000 ALTER TABLE `History` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `age` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'a1@gmail.com','$2b$10$UOk15QdVrbSMfclBhOjnNupT.6zGyEsMNRSt4DK6tjJypUOOheeNu','a1','여',24);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `subtitle` varchar(45) DEFAULT NULL,
  `discription` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `duration` time NOT NULL,
  `views` int unsigned NOT NULL DEFAULT '0',
  `thumb` varchar(255) DEFAULT NULL,
  `likes` int NOT NULL DEFAULT '0',
  `category_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `fk_category_name` (`category_name`),
  CONSTRAINT `fk_category_name` FOREIGN KEY (`category_name`) REFERENCES `category` (`category_name`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (29,'Big Buck Bunny',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4','00:10:00',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',0,'애니메이션'),(30,'Elephant Dream',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4','00:12:00',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',0,'애니메이션'),(31,'For Bigger Blazes',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4','00:05:00',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',0,'애니메이션'),(32,'For Bigger Escape',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4','00:07:30',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',0,'애니메이션'),(33,'For Bigger Fun',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4','00:06:15',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',0,'애니메이션'),(34,'For Bigger Joyrides',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4','00:08:45',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',0,'애니메이션'),(35,'For Bigger Meltdowns',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4','00:09:00',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',0,'애니메이션'),(36,'Sintel',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4','00:14:30',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',0,'애니메이션'),(37,'Subaru Outback On Street And Dirt',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4','00:04:50',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',0,'애니메이션'),(38,'Tears of Steel',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4','00:15:00',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',0,'애니메이션'),(39,'Volkswagen GTI Review',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4','00:06:20',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg',0,'애니메이션'),(40,'We Are Going On Bullrun',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4','00:10:15',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg',0,'애니메이션'),(41,'What care can you get for a grand?',NULL,NULL,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4','00:07:10',0,'https://storage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg',0,'애니메이션');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_like`
--

DROP TABLE IF EXISTS `video_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_like` (
  `video_like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `video_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_like_id`),
  UNIQUE KEY `user_id` (`user_id`,`video_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `video_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `video_like_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_like`
--

LOCK TABLES `video_like` WRITE;
/*!40000 ALTER TABLE `video_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `video_like` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-10 20:41:18
