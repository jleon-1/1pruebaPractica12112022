-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: db_streaming
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `perfiles`
--

DROP TABLE IF EXISTS `perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfiles` (
  `id_perfil` int NOT NULL AUTO_INCREMENT,
  `perfil` varchar(45) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  `usuario_creacion` varchar(45) NOT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_perfil`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfiles`
--

LOCK TABLES `perfiles` WRITE;
/*!40000 ALTER TABLE `perfiles` DISABLE KEYS */;
INSERT INTO `perfiles` VALUES (1,'JHON LUDENA','A','jludena',NULL,'2022-11-27 05:00:00',NULL),(2,'MIGUEL LUDENA','A','jludena',NULL,'2022-11-28 05:00:00',NULL),(3,'MIGUEL LARA','A','jludena',NULL,'2022-11-28 05:00:00',NULL);
/*!40000 ALTER TABLE `perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personas` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  `usuario_creacion` varchar(45) NOT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (1,'JHON JEFFERSON','LUDEÑA REYES','2489584798','A','jludena',NULL,'2022-11-27 05:00:00',NULL),(2,'MARIA FERNANDA','LOPEZ TAMAYO','2495687954','A','jludena',NULL,'2022-11-27 05:00:00',NULL),(3,'MIGUEL ANGEL','LARA REYES','2400085634','A','jludena',NULL,'2022-11-28 05:00:00',NULL);
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planes`
--

DROP TABLE IF EXISTS `planes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planes` (
  `id_plan` int NOT NULL AUTO_INCREMENT,
  `plan` varchar(45) NOT NULL,
  `max_perfil` int NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  `usuario_creacion` varchar(45) NOT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_plan`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planes`
--

LOCK TABLES `planes` WRITE;
/*!40000 ALTER TABLE `planes` DISABLE KEYS */;
INSERT INTO `planes` VALUES (1,'BASICO',2,'A','jludena',NULL,'2022-11-27 05:00:00',NULL),(2,'INTERMEDIO',3,'A','jludena',NULL,'2022-11-27 05:00:00',NULL),(3,'AVANZADO',5,'A','jludena',NULL,'2022-11-27 05:00:00',NULL);
/*!40000 ALTER TABLE `planes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `id_persona` int NOT NULL,
  `id_plan` int NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contrasenia` varchar(45) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  `usuario_creacion` varchar(45) NOT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`,`id_persona`,`id_plan`),
  KEY `fk_usuarios_personas_idx` (`id_persona`),
  KEY `fk_usuarios_planes_idx` (`id_plan`),
  CONSTRAINT `fk_usuarios_personas` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`),
  CONSTRAINT `fk_usuarios_planes` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,1,1,'jludena','jludena@outlook.com','admin','A','jludena',NULL,'2022-11-27 05:00:00',NULL),(2,2,2,'mlopez','mlopez@outlook.com','123','A','jludena',NULL,'2022-11-28 03:24:55',NULL),(3,3,2,'mlara','mlara@outlook.com','admin','A','jludena',NULL,'2022-11-28 22:53:03',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_perfiles`
--

DROP TABLE IF EXISTS `usuarios_perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_perfiles` (
  `id_usuario_perfil` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_perfil` int NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  `usuario_creacion` varchar(45) NOT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario_perfil`,`id_usuario`,`id_perfil`),
  KEY `fk_planes_perfiles_perfiles_idx` (`id_perfil`),
  KEY `fk_usuarios_perfiles_usuarios_idx` (`id_usuario`),
  CONSTRAINT `fk_usuarios_perfiles_perfiles` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles` (`id_perfil`),
  CONSTRAINT `fk_usuarios_perfiles_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_perfiles`
--

LOCK TABLES `usuarios_perfiles` WRITE;
/*!40000 ALTER TABLE `usuarios_perfiles` DISABLE KEYS */;
INSERT INTO `usuarios_perfiles` VALUES (1,1,1,'A','jludena',NULL,'2022-11-27 05:00:00',NULL),(3,3,3,'I','jludena',NULL,'2022-11-28 22:56:01',NULL);
/*!40000 ALTER TABLE `usuarios_perfiles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-29 17:47:28
