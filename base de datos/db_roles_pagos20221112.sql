-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: db_roles_pagos
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `egresos`
--

DROP TABLE IF EXISTS `egresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `egresos` (
  `id_egreso` int NOT NULL AUTO_INCREMENT,
  `id_empleado` int NOT NULL,
  `id_tipo_egreso` int NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_egreso`,`id_empleado`,`id_tipo_egreso`),
  KEY `fk_egresos_empleados_idx` (`id_empleado`),
  KEY `fk_egresos_tipos_egresos_idx` (`id_tipo_egreso`),
  CONSTRAINT `fk_egresos_empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`),
  CONSTRAINT `fk_egresos_tipos_egresos` FOREIGN KEY (`id_tipo_egreso`) REFERENCES `tipos_egresos` (`id_tipo_egreso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `egresos`
--

LOCK TABLES `egresos` WRITE;
/*!40000 ALTER TABLE `egresos` DISABLE KEYS */;
INSERT INTO `egresos` VALUES (1,1,1,84.15,'A'),(2,1,2,100.00,'A'),(3,2,1,56.10,'A');
/*!40000 ALTER TABLE `egresos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'JHON JEFFERSON','LUDEÑA REYES','2400095622','A'),(2,'SANDRA ALEJANDRA','LOPEZ SANTILLAN','2400095642','A');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingresos`
--

DROP TABLE IF EXISTS `ingresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingresos` (
  `id_ingreso` int NOT NULL AUTO_INCREMENT,
  `id_empleado` int NOT NULL,
  `id_tipo_ingreso` int NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_ingreso`,`id_empleado`,`id_tipo_ingreso`),
  KEY `fk_ingresos_empleados_idx` (`id_empleado`),
  KEY `fk_ingresos_tipo_ingresos_idx` (`id_tipo_ingreso`),
  CONSTRAINT `fk_ingresos_empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`),
  CONSTRAINT `fk_ingresos_tipos_ingresos` FOREIGN KEY (`id_tipo_ingreso`) REFERENCES `tipos_ingresos` (`id_tipo_ingreso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingresos`
--

LOCK TABLES `ingresos` WRITE;
/*!40000 ALTER TABLE `ingresos` DISABLE KEYS */;
INSERT INTO `ingresos` VALUES (1,1,1,900.00,'A'),(2,1,2,200.00,'A'),(3,2,1,600.00,'A');
/*!40000 ALTER TABLE `ingresos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_pagos`
--

DROP TABLE IF EXISTS `roles_pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_pagos` (
  `id_rol_pago` int NOT NULL AUTO_INCREMENT,
  `id_empleado` int NOT NULL,
  `neto_pagar` decimal(10,2) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_rol_pago`,`id_empleado`),
  KEY `fk_roles_pagos_empleados_idx` (`id_empleado`),
  CONSTRAINT `fk_roles_pagos_empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_pagos`
--

LOCK TABLES `roles_pagos` WRITE;
/*!40000 ALTER TABLE `roles_pagos` DISABLE KEYS */;
INSERT INTO `roles_pagos` VALUES (1,1,915.85,'A'),(2,2,543.90,'A');
/*!40000 ALTER TABLE `roles_pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_egresos`
--

DROP TABLE IF EXISTS `tipos_egresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_egresos` (
  `id_tipo_egreso` int NOT NULL AUTO_INCREMENT,
  `tipo_egreso` varchar(45) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_tipo_egreso`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_egresos`
--

LOCK TABLES `tipos_egresos` WRITE;
/*!40000 ALTER TABLE `tipos_egresos` DISABLE KEYS */;
INSERT INTO `tipos_egresos` VALUES (1,'IIEES','A'),(2,'ANTICIPO','A');
/*!40000 ALTER TABLE `tipos_egresos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_ingresos`
--

DROP TABLE IF EXISTS `tipos_ingresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_ingresos` (
  `id_tipo_ingreso` int NOT NULL AUTO_INCREMENT,
  `tipo_ingreso` varchar(45) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_tipo_ingreso`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_ingresos`
--

LOCK TABLES `tipos_ingresos` WRITE;
/*!40000 ALTER TABLE `tipos_ingresos` DISABLE KEYS */;
INSERT INTO `tipos_ingresos` VALUES (1,'SUELDO','A'),(2,'HORAS_EXTRAS','A');
/*!40000 ALTER TABLE `tipos_ingresos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-12 14:38:21
