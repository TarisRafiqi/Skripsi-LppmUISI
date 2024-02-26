CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `pengalaman_diseminasi`
--

DROP TABLE IF EXISTS `pengalaman_diseminasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengalaman_diseminasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `tahun_diseminasi` varchar(45) DEFAULT NULL,
  `judul_artikel` text,
  `nama_pemakalah` text,
  `nama_pertemuan` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengalaman_diseminasi`
--

LOCK TABLES `pengalaman_diseminasi` WRITE;
/*!40000 ALTER TABLE `pengalaman_diseminasi` DISABLE KEYS */;
INSERT INTO `pengalaman_diseminasi` VALUES (1,40,'2019','Test Judul Artikel 1','Nama Pemakalah 1','Nama Pertemuan 1'),(2,40,'2020','Test Judul Artikel 2','Nama Pemakalah 2','Nama Pertemuan 1'),(20,60,'5555','5555','5555','5555');
/*!40000 ALTER TABLE `pengalaman_diseminasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengalaman_hki`
--

DROP TABLE IF EXISTS `pengalaman_hki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengalaman_hki` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `tahun_hki` varchar(45) DEFAULT NULL,
  `judul_hki` text,
  `nama_penulis` text,
  `jenis_hki` text,
  `no_hki` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengalaman_hki`
--

LOCK TABLES `pengalaman_hki` WRITE;
/*!40000 ALTER TABLE `pengalaman_hki` DISABLE KEYS */;
INSERT INTO `pengalaman_hki` VALUES (1,40,'2019','Test Judul HKI 1','Test Nama 1','Test Jenis HKI 1','Test No HKI 1'),(2,40,'2019','Test Judul HKI 2','Test Nama 2','Test Jenis HKI 2','Test No HKI 2'),(17,60,'5555','5555','5555','5555','5555'),(20,40,'2020','Test Judul Baru HKI-03','Taris Rafiqi','Penerbit Magang','Test ISBN-03');
/*!40000 ALTER TABLE `pengalaman_hki` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengalaman_penelitian`
--

DROP TABLE IF EXISTS `pengalaman_penelitian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengalaman_penelitian` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `tahun_penelitian` varchar(45) DEFAULT NULL,
  `judul_penelitian` text,
  `role_penelitian` varchar(256) DEFAULT NULL,
  `sumber_dana` varchar(256) DEFAULT NULL,
  `jumlah` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengalaman_penelitian`
--

LOCK TABLES `pengalaman_penelitian` WRITE;
/*!40000 ALTER TABLE `pengalaman_penelitian` DISABLE KEYS */;
INSERT INTO `pengalaman_penelitian` VALUES (1,40,'2015','Pengembangan Kecerdasan Buatan untuk Pemantauan Kualitas dan Kerusakan Infrastruktur Berbasis Cloud dan Photogrammetic Computer Vision','Ketua','Internal UISI','Rp. 35.000.000'),(43,40,'2017','Mobil Robot Cerdas Berbasiskan Visi Sebagai Alat Bantu Pencitraan Jarak Jauh','Anggota','Mandiri','Rp. 5.050.000'),(49,60,'12','12','Ketua','12','Rp. 12'),(51,48,'7777','Test judul user Tristan','Ketua','Mandiri','Rp. 7.777.777');
/*!40000 ALTER TABLE `pengalaman_penelitian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengalaman_pengmas`
--

DROP TABLE IF EXISTS `pengalaman_pengmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengalaman_pengmas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `tahun_pengmas` varchar(45) DEFAULT NULL,
  `judul_pengmas` text,
  `role_pengmas` varchar(256) DEFAULT NULL,
  `sumber_dana` varchar(256) DEFAULT NULL,
  `jumlah` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengalaman_pengmas`
--

LOCK TABLES `pengalaman_pengmas` WRITE;
/*!40000 ALTER TABLE `pengalaman_pengmas` DISABLE KEYS */;
INSERT INTO `pengalaman_pengmas` VALUES (1,40,'2018','Implementasi Game Tebak Gambar Binatang berbasis android Sebagai Media Pembelajaran pada anak usia dini','Anggota','Eksternal','Rp. 13.000.000'),(2,40,'2020','	Pembuatan Peta Dasar Skala 1 : 5.000 Kota Gresik','Ketua','Internal','Rp. 3.000.000'),(45,60,'12','12','Ketua','12','Rp. 12');
/*!40000 ALTER TABLE `pengalaman_pengmas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengalaman_penulisanbuku`
--

DROP TABLE IF EXISTS `pengalaman_penulisanbuku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengalaman_penulisanbuku` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `tahun_buku` varchar(45) DEFAULT NULL,
  `judul_buku` text,
  `nama_penulis` text,
  `penerbit` text,
  `isbn` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengalaman_penulisanbuku`
--

LOCK TABLES `pengalaman_penulisanbuku` WRITE;
/*!40000 ALTER TABLE `pengalaman_penulisanbuku` DISABLE KEYS */;
INSERT INTO `pengalaman_penulisanbuku` VALUES (1,40,'2022','Test Judul Buku 1 Baru','Test Nama Penulis 1','Penerbit Test!','Test isbn-01'),(16,40,'123','123','123','123','123'),(18,60,'5555','5555','5555','5555','5555');
/*!40000 ALTER TABLE `pengalaman_penulisanbuku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengalaman_publikasi`
--

DROP TABLE IF EXISTS `pengalaman_publikasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengalaman_publikasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `tahun_publikasi` varchar(45) DEFAULT NULL,
  `judul_artikel` text,
  `nama_jurnal` text,
  `impact` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengalaman_publikasi`
--

LOCK TABLES `pengalaman_publikasi` WRITE;
/*!40000 ALTER TABLE `pengalaman_publikasi` DISABLE KEYS */;
INSERT INTO `pengalaman_publikasi` VALUES (1,40,'2022','Test Judul Artikel Publikasi 1','Test nama Jurnal, Vol 1, No Issue 1, Halaman 111','Test isi impact');
/*!40000 ALTER TABLE `pengalaman_publikasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengumuman`
--

DROP TABLE IF EXISTS `pengumuman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengumuman` (
  `id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(256) NOT NULL,
  `isi` varchar(256) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '0',
  `update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengumuman`
--

LOCK TABLES `pengumuman` WRITE;
/*!40000 ALTER TABLE `pengumuman` DISABLE KEYS */;
INSERT INTO `pengumuman` VALUES (42,'xasdasdasdasdssssssssssss','xasdasdasdasdasdadsssssssssssss',0,'2023-08-28 05:09:19'),(43,'xasdasdasdasdsssdasdasdsssssssss','xasdasdasdasdasdasdadasadsssssssssssss',0,'2023-08-28 05:09:22'),(44,'xasdasdasdasdsssdasdasdsssssssss','xasdasdasdasdasdasdadasadsssssssssssss',0,'2023-08-28 05:09:24'),(45,'Lorem ipsum','xasdasdasdasdasdasdadasadsssssssssssss',0,'2023-08-28 05:09:32'),(51,'asdasd','asdas',0,'2023-08-29 15:37:18'),(52,'asdasd','asdassss',0,'2023-08-29 15:37:22');
/*!40000 ALTER TABLE `pengumuman` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ppm`
--

DROP TABLE IF EXISTS `ppm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ppm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `judul` varchar(256) DEFAULT NULL,
  `abstrak` text,
  `isi` text,
  `status` int NOT NULL DEFAULT '0',
  `comment` varchar(256) DEFAULT NULL,
  `uid_kdept` int DEFAULT NULL,
  `uid_klppm` int DEFAULT NULL,
  `uid_kpk` int DEFAULT NULL,
  `uid_reviewer` int DEFAULT NULL,
  `jenis_kegiatan` varchar(256) DEFAULT NULL,
  `jenis_skema` varchar(256) DEFAULT NULL,
  `jenis_proposal` varchar(256) DEFAULT NULL,
  `kelompok_keahlian` varchar(256) DEFAULT NULL,
  `tahun_pelaksanaan` varchar(45) DEFAULT NULL,
  `topik` varchar(256) DEFAULT NULL,
  `biaya_penelitian` varchar(256) DEFAULT NULL,
  `anggota_tim` json DEFAULT NULL,
  `update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `random_file_name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ppm`
--

LOCK TABLES `ppm` WRITE;
/*!40000 ALTER TABLE `ppm` DISABLE KEYS */;
INSERT INTO `ppm` VALUES (42,40,'Pemanfaatan Teknologi Mikrokontroller Sebagai Pemesanan Menu Makanan dan Minuman Untuk Pelayanan Pada Kafe.','Berdasarkan data BMKG Stasiun Klimatologi Malang dari tahun 1999-2019 tercatat bahwa terdapat kenaikan suhu rata-rata sebesar 1,4&deg;C yang mana ini sangat dirasakan oleh penduduk yang tinggal di Kota Malang','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',10,'',42,43,44,45,'Penelitian','Riset Terapan','Proposal Awal','Komputer','2024-02','Test Topik','Rp. 77.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-21 17:13:36',NULL),(43,48,'Analisis Perbaikan Sistem Kerja Pada Pekerja Bagian Produksi Dengan Metode Quick Exposure Check (QEC)','Pengembangan Metode Pembelajaran Two Stay Two Stray Berbasis Online...','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',10,'',52,53,54,50,'Penelitian','Riset Terapan','Proposal Awal','Komputer','2024-02','Test Topik','Rp. 77.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-21 17:13:24',NULL),(44,40,'Penerapan Algoritma Learning Vector Quantization (LVQ) untuk Klasifiakasi Tingkat Kematangan Buah Sawit','Pemanfaatan Barcode untuk Efisiensi Proses Merekap Nilai Tugas Kuliah','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',3,'',52,43,54,51,'Pengabdian Masyarakat','Pengabdian Masyarakat Hibah Eksternal','Proposal Awal','Komputer','2024-02','Test Topik','Rp. 37.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-19 11:36:05',NULL),(48,40,'E-Modul Speaking bagi Tenaga Kependidikan ITN Malang: Task-based Planning dan Product Design','Test memasukkan abstrak ~~~','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>',13,NULL,NULL,NULL,NULL,NULL,'Penelitian','Riset Terapan','Proposal Awal','Elektronika','2024-02','Test Topik','Rp. 47.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(49,40,'Analisis Peramalan Produksi Kedelai Menggunakan Single Moving Average','<p>Jadi ini adalah abstrak</p>','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',2,'',42,53,54,50,'Penelitian','Riset Terapan','Proposal Awal','Komputer','2024-02','Test Topik','Rp. 90.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(50,40,'Analisis Location Based Service Untuk Aplikasi Pencarian Lokasi Apotek Terdekat','<p>Abstrak yang bener sekarang</p>','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',2,'',NULL,NULL,NULL,NULL,'Pengabdian Masyarakat','Pengabdian Masyarakat Hibah Eksternal','Proposal Awal','Komputer','2024-02','Test Topik','Rp. 90.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(51,50,'Evaluating an Automatic Filter Fishponds Mapping by Google Earth Engine: A Case Study in East Banyuwangi','testtest','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>',11,'',NULL,NULL,NULL,NULL,'Pengabdian Masyarakat','Pengabdian Masyarakat Hibah Eksternal','Proposal Awal','Management','2024-02','Test Topik','Rp. 17.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(52,50,'Deteksi Longsor berbasis Regangan dan Kejenuhan Tanah','<p>asdadadas</p>','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',2,'',NULL,NULL,NULL,NULL,'Penelitian','Riset Terapan','Proposal Awal','Komputer','2024-02','Test Topik','Rp. 23.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(53,51,'Sistem Deteksi Lubang Pada Aspal','<p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface</p>','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',2,'',NULL,NULL,NULL,NULL,'Pengabdian Masyarakat','Pengabdian Masyarakat Hibah Eksternal','Proposal Awal','Management','2024-02','Test Topik','Rp. 44.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(54,49,'Sistem Managemen Energi Gedung Kampus Berbais IoT','Lorem ipsum is a placeholder text commonly used to demonstrate the visual , form of a document or a typeface','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>',6,'',42,43,44,45,'Penelitian','Riset Terapan','Proposal Lanjutan','Management','2024-06','Management','Rp. 97.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(84,40,'Analisis Kompetensi dan Knowledge Sharing terhadap Kinerja Arsitek serta Dampaknya pada Kinerja Organisasi di Jawa Timur','asd','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>',5,NULL,NULL,NULL,NULL,NULL,'Pengabdian Masyarakat','Pengabdian Masyarakat Hibah Eksternal','Proposal Awal','Komputer','2023-03','Test Topik','Rp. 51.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-19 11:36:27',NULL),(87,42,'Evaluasi Pemanfaatan Ruang Berbasis Sistem Informasi Geografis Dengan Menganalisis Perubahan Penggunaan Lahan','<p>Abstrak Kdept Abstrak Kdept Abstrak Kdept</p>','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',12,'',NULL,NULL,NULL,NULL,'Penelitian','Riset Terapan','Proposal Lanjutan','Komputer','2024-02','Test Topik','Rp. 30.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(88,45,'Penerapan Metode Moving Avarage Untuk Peramalan Jumlah Penganguran Penduduk Indonesia','Test Judul Reviewer','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>',8,NULL,42,43,44,45,'Pengabdian Masyarakat','Pengabdian Masyarakat Hibah Eksternal','Proposal Awal','Komputer','2024-02','Test Topik','Rp. 25.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-21 18:14:42',NULL),(89,44,'Penggunaan Algoritma K-Mean Untuk Penggalian Kaidah Asosiasi Data Penjualan','Judul Punya KPK','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>',2,NULL,NULL,NULL,NULL,NULL,'Pengabdian Masyarakat','Pengabdian Masyarakat Hibah Eksternal','Proposal Lanjutan','Komputer','2024-02','Test Topik','Rp. 70.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(99,40,'Analisis dan Evaluasi Numerikal Pengaruh Kait Kunci (Interlocking) Pada Genteng Dalam Menerima Beban','<p><span style=\"font-family: \'times new roman\', times, serif;\">Judul ini dibuat untuk testing TextArea <s>dari</s> library <strong>Tinymce</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%; height: 44.7812px;\" border=\"1\"><colgroup><col style=\"width: 6.50814%;\"><col style=\"width: 93.4919%;\"></colgroup>\n<tbody>\n<tr style=\"height: 22.3906px;\">\n<td style=\"height: 22.3906px;\"><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td style=\"height: 22.3906px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Judul</span></td>\n</tr>\n<tr style=\"height: 22.3906px;\">\n<td style=\"height: 22.3906px;\"><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td style=\"height: 22.3906px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Emang ada judul?</span></td>\n</tr>\n</tbody>\n</table>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Sekian Terimakasih...</span></em></span></p>','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>',2,NULL,NULL,NULL,NULL,NULL,'Pengabdian Masyarakat','Pengabdian Masyarakat Hibah Eksternal','Proposal Awal','Komputer','2024-02','Test Topik','Rp. 49.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-18 14:51:02',NULL),(104,60,'Pembuatan CPU Komputer Dengan Fabrikasi 1nm menggunakan bahan','<p>Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</p>','<h2 style=\"text-align: justify;\"><span style=\"font-family: \'times new roman\', times, serif;\">1.Tanaman sawit</span></h2>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\">Tanaman sawit merupakan sumber devisa negara, karena Indonesia merupakan negara produsen minyak sawit terbesar di dunia. Dan&nbsp;indonesia merupakan negera tropis terbesar di dunia. Sehingga Kelapa sawit merupakan salah satu tumbuhan tropis penghasil minyak nabati yang banyak dibudidayakan di indonesia. Ketepatan dalam menentukan tingkat kematangan buah kelapa sawit menentukan kualitas hasil panen tumbuhan ini. Penelitian ini memanfaatkan pengolahan citra digital untuk mengidentifikasi kematangan buah kelapa sawit. Secara umum penentuan kematangan dilakukan dengan penglihatan orang yang berpengalaman berdasarkan jumlah buah yang terlepas dari tandan dan warna buah. Penelitian ini bertujuan untuk mengukur kematangan buah sawit berdasarkan warna menggunakan metode Learning Vector Quantization (LVQ).</span></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify; padding-left: 40px;\"><span style=\"font-family: \'times new roman\', times, serif;\"><strong>Test Table:</strong></span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\"><colgroup><col style=\"width: 4.98721%;\"><col style=\"width: 24.5524%;\"><col style=\"width: 70.4604%;\"></colgroup>\n<tbody>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">No</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nama</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Nim</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">1</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Taris Rafiqi Izatri</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011810050</span></td>\n</tr>\n<tr>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">2</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">Subject Test</span></td>\n<td><span style=\"font-family: \'times new roman\', times, serif;\">3011818181</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://awsimages.detik.net.id/community/media/visual/2022/11/03/gambar-dekoratif-2.jpeg?w=1200\" alt=\"\" width=\"399\" height=\"266\"></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-family: \'times new roman\', times, serif;\"><em><span style=\"text-decoration: underline;\">Lorem ipsum dolor sit amet</span>, consectetur <s>adipiscing eli</s>t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></span></p>\n<ol>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 1 <em>Excepteur </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 2 <em>occaecat </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 3 <em>dolor </em></span></li>\n<li style=\"font-family: \'times new roman\', times, serif;\"><span style=\"font-family: \'times new roman\', times, serif;\">Subject 4 <em>proident ₦</em></span></li>\n</ol>\n<p>&nbsp;</p>',4,'',42,43,44,45,'Penelitian','Riset Kelompok Keahlian','Proposal Awal','Test kelompok keahlian','2023-06','Test Topik','Rp. 60.000.000','[{\"label\": \"Saudara Approval Satuu\", \"value\": \"42\"}, {\"label\": \"Saudara Approva Tiga\", \"value\": \"44\"}, {\"label\": \"Mohammad Zabarzat\", \"value\": \"49\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-21 18:19:37','JjfpChxDiLQdGJQLsbrX9b0DY2g21h'),(154,40,'test33','test33','<p>test33</p>\n<p>&nbsp;</p>\n<p class=\"MsoListParagraph\" style=\"text-indent: -18.0pt; line-height: 150%; mso-list: l0 level1 lfo1; tab-stops: 10.0pt 21.25pt;\"><!-- [if !supportLists]--><span lang=\"EN-US\" style=\"font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt \'Times New Roman\';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span lang=\"EN-US\" style=\"font-family: \'Arial\',sans-serif;\">Klik tombol &ldquo;Login&rdquo; disebelah kanan atas</span></p>\n<p class=\"MsoNormal\" style=\"margin-left: 36.0pt; text-indent: -18.0pt; line-height: 150%; mso-list: l0 level1 lfo1; tab-stops: 10.0pt 21.25pt;\"><!-- [if !supportLists]--><span lang=\"EN-US\" style=\"font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt \'Times New Roman\';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span lang=\"EN-US\" style=\"font-family: \'Arial\',sans-serif;\">Akan muncul halaman Login</span></p>\n<p class=\"MsoNormal\" style=\"margin-left: 36.0pt; text-indent: -18.0pt; line-height: 150%; mso-list: l0 level1 lfo1; tab-stops: 10.0pt 21.25pt;\"><!-- [if !supportLists]--><span lang=\"EN-US\" style=\"font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt \'Times New Roman\';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span lang=\"EN-US\" style=\"font-family: \'Arial\',sans-serif;\">Pada form Username, ketikkan &ldquo;admin&rdquo;</span></p>\n<p class=\"MsoNormal\" style=\"margin-left: 36.0pt; text-indent: -18.0pt; line-height: 150%; mso-list: l0 level1 lfo1; tab-stops: 10.0pt 21.25pt;\"><!-- [if !supportLists]--><span lang=\"EN-US\" style=\"font-family: Symbol; mso-fareast-font-family: Symbol; mso-bidi-font-family: Symbol;\"><span style=\"mso-list: Ignore;\">&middot;<span style=\"font: 7.0pt \'Times New Roman\';\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><!--[endif]--><span lang=\"EN-US\" style=\"font-family: \'Arial\',sans-serif;\">Pada form Password, ketikkan &ldquo;1234</span></p>',0,NULL,NULL,NULL,NULL,NULL,'Penelitian','Riset Kelompok Keahlian','Proposal Awal','test','2024-07','test','Rp. 22.222.222','[{\"label\": \"Ahmad I\'Tishom Al Husain\", \"value\": \"51\"}, {\"label\": \"Mohammad Ardabily Assakhy Habibi\", \"value\": \"50\"}]','2024-01-20 16:19:52','yz5pJNg7dwqSpIGavytVup2fEq48SI'),(155,40,'3333333','3333333','<p><span style=\"font-size: 18pt;\"><strong>33333</strong></span></p>\n<ol>\n<li>33333</li>\n<li>333333</li>\n<li>3333333</li>\n<li>33333333</li>\n</ol>',2,NULL,NULL,NULL,NULL,NULL,'Penelitian','Riset Kelompok Keahlian','Proposal Awal','3333333','2024-06','3333333','Rp. 3.333.333','[{\"label\": \"Sdr Approval Satu\", \"value\": \"42\"}, {\"label\": \"Sdr Approval Dua\", \"value\": \"43\"}, {\"label\": \"Sdr Approval Tiga\", \"value\": \"44\"}]','2024-01-20 16:26:02','yAxJHfHQjMBHbTgQ9GGdqCYogB9oQY');
/*!40000 ALTER TABLE `ppm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `nama_lengkap` varchar(256) DEFAULT NULL,
  `nip` varchar(256) DEFAULT NULL,
  `nidn` varchar(256) DEFAULT NULL,
  `tempat_lahir` varchar(256) DEFAULT NULL,
  `tanggal_lahir` varchar(45) DEFAULT NULL,
  `alamat_rumah` varchar(256) DEFAULT NULL,
  `alamat_kantor` varchar(256) DEFAULT NULL,
  `nomor_handphone` varchar(256) DEFAULT NULL,
  `telp_fax_rumah` varchar(256) DEFAULT NULL,
  `perguruan_tinggi_asal` varchar(256) DEFAULT NULL,
  `jabatan_fungsional` varchar(256) DEFAULT NULL,
  `pangkat_golongan` varchar(256) DEFAULT NULL,
  `telp_fax_kantor` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `mata_kuliah` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,40,'Taris Rafiqi Izatri, S.Kom., M.Kom.,','3011810050','323110222141441','Padang','2000-05-06','Perumahan Semen Indonesia, Blok G ','Jl. Veteran, Kb. Dalem, Sidomoro,','81210703103','3121070222','Universitas Internasional Semen Indonesia','Dosen','Asisten Ahli','7511515','tarisrafiqi@gmail.com','[{\"label\": \"Informatika\"}, {\"label\": \"Matematika\"}]'),(2,41,'Admin 001','301181005','5331278','Surabaya','2000-06-07','Perumahan Semen Indonesia','Jl. Veteran, Kb. Dalem, Sidomoro,','12412412','12412412','Universitas Internasional Semen Indonesia','Administrator','Asisten Ahli','01200012',NULL,'[{\"label\": \"Informatika\"}, {\"label\": \"test\"}]'),(3,42,'Sdr Approval Satu','532326855','8756743','Jakarta','2000-07-08','Perumahan Semen Indonesia','Jl. Veteran, Kb. Dalem, Sidomoro,','12846633','41226623','Universitas Internasional Semen Indonesia','Kepala Departemen','Lektor','882019291123','SdrApproval@gmail.com','[{\"label\": \"Matematika\"}]'),(4,43,'Sdr Approval Dua','235685688','9876432','Bandung','2001-08-09','Perumahan Semen Indonesia','Jl. Veteran, Kb. Dalem, Sidomoro,','53477893','32363576','Universitas Internasional Semen Indonesia','Kepala LPPM','Lektor Kepala',NULL,NULL,NULL),(5,44,'Sdr Approval Tiga','745749904','2356458','Yogyakarta','2000-10-08','Perumahan Semen Indonesia','Jl. Veteran, Kb. Dalem, Sidomoro,','32658665','34672163','Universitas Internasional Semen Indonesia','Kepala Pusat Kajian','Profesor',NULL,NULL,NULL),(6,45,'Sdr Reviewer','234264575','3534653','Semarang','1999-05-06','Perumahan Semen Indonesia','Jl. Veteran, Kb. Dalem, Sidomoro,','34757408','23526443','Universitas Internasional Semen Indonesia','Reviewer','Asisten Ahli',NULL,NULL,'[{\"label\": \"Test1\"}]'),(7,48,'Tristan Byrne','345378942','4949472','Bali','2000-05-06','Perumahan Semen Indonesia','Jl. Veteran, Kb. Dalem, Sidomoro,','98845234','67578899','Universitas Internasional Semen Indonesia','Dosen','Asisten Ahli','993110303','Tristan.bryne@gmail.com','[{\"label\": \"Informatika\"}, {\"label\": \"Bahasa Jawa\"}]'),(8,49,'Mohammad Zabarzat','125463227','301181000012','Riau','2000-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'[{\"label\": \"Elektro\"}]'),(9,50,'Mohammad Ardabily Assakhy Habibi','443337457','301181002094','Lampung','2000-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,51,'Ahmad I\'Tishom Al Husain','674427224','301181001224','Surabaya','2000-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,52,'Sdr Wakadep','082921982','301920492012','Malang','2000-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,53,'Sdr Wakalppm','241246346','200192885030','Lombok','2000-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,54,'Sdr Wakakpk','563330701','121543253212','Aceh','2000-05-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,60,'Taris Rafiqi Izatri, S.Kom., M.Kom.,','301181005','301298582822','Padang','2000-05-06','Perumdin Semen Indonesia','Jalan Sesame Street','81210703','81210703','Universitas Internasional Semen Indonesia','Dosen','Lektor','12313','tarisrafiqi@gmail.com','[{\"label\": \"Informatika\"}, {\"label\": \"Matematika\"}]');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riwayat_pendidikan`
--

DROP TABLE IF EXISTS `riwayat_pendidikan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riwayat_pendidikan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `nama_perti_s1` varchar(256) DEFAULT NULL,
  `nama_perti_s2` varchar(256) DEFAULT NULL,
  `nama_perti_s3` varchar(256) DEFAULT NULL,
  `bidang_ilmu_s1` varchar(256) DEFAULT NULL,
  `bidang_ilmu_s2` varchar(256) DEFAULT NULL,
  `bidang_ilmu_s3` varchar(256) DEFAULT NULL,
  `tahun_masuk_s1` int DEFAULT NULL,
  `tahun_masuk_s2` int DEFAULT NULL,
  `tahun_masuk_s3` int DEFAULT NULL,
  `tahun_lulus_s1` int DEFAULT NULL,
  `tahun_lulus_s2` int DEFAULT NULL,
  `tahun_lulus_s3` int DEFAULT NULL,
  `judul_tugasakhir_s1` text,
  `judul_tugasakhir_s2` text,
  `judul_tugasakhir_s3` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riwayat_pendidikan`
--

LOCK TABLES `riwayat_pendidikan` WRITE;
/*!40000 ALTER TABLE `riwayat_pendidikan` DISABLE KEYS */;
INSERT INTO `riwayat_pendidikan` VALUES (1,40,'Universitas Internasional Semen Indonesia','Universitas Indonesia','','Informatika','Sistem Informasi','',2018,2024,NULL,2024,2026,NULL,'Pembuatan Sistem Informasi LPPM UISI Menggunakan Metode Incremental ','Test Judul Baru',''),(2,41,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,42,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,43,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,44,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,45,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,48,'Universitas Airlangga','Universitas Gadjah Mada',NULL,'Informatika','Informatika',NULL,2015,2019,NULL,2019,2021,NULL,'Test Judul Skripsi','Test Judul Tesis',NULL),(8,49,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,50,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,51,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,52,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,53,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,54,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,60,'Universitas Internasional Semen Indonesia','Universitas Indonesia',NULL,'Informatika','Sistem Informasi',NULL,2018,2024,NULL,2024,2026,NULL,'Pembuatan Sistem Informasi LPPM UISI Menggunakan Metode Incremental ','Test Judul Baru',NULL);
/*!40000 ALTER TABLE `riwayat_pendidikan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `code` varchar(12) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `role` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '0',
  `update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=702 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (40,'fiqi','1234',NULL,'dosen@pt.ac.id',0,1,'2024-01-13 06:10:28'),(41,'admin','1234',NULL,'admin@pt.ac.id',9,1,'2023-12-08 09:55:55'),(42,'kdept','1234',NULL,'kdept@pt.ac.id',11,1,'2024-01-19 06:53:59'),(43,'klppm','1234',NULL,'klppm@pt.ac.id',12,1,'2023-09-25 15:49:18'),(44,'kpk','1234',NULL,'kpk@pt.ac.id',13,1,'2023-09-25 15:49:18'),(45,'reviewer','1234',NULL,'reviewer@pt.ac.id',10,1,'2023-09-18 09:43:25'),(48,'tristan','1234',NULL,'tristan@pt.ac.id',0,1,'2023-12-08 10:09:13'),(49,'ijad','1234',NULL,'ijadr@pt.ac.id',10,1,'2023-09-18 09:43:25'),(50,'arda','1234',NULL,'arda@pt.ac.id',10,1,'2023-09-18 09:43:25'),(51,'ichom','1234',NULL,'ichom@pt.ac.id',10,1,'2023-09-25 15:04:22'),(52,'wakilkdept','1234',NULL,'wakilkdept@pt.ac.id',11,1,'2024-01-19 06:53:59'),(53,'wakilklppm','1234',NULL,'wakilklppm@pt.ac.id',12,1,'2023-09-24 10:23:01'),(54,'wakilkpk','1234',NULL,'wakilkpk@pt.ac.id',13,1,'2023-09-24 10:24:19'),(60,'taris.izatri18@student.uisi.ac.id',NULL,NULL,'taris.izatri18@student.uisi.ac.id',0,1,'2024-01-23 02:26:47');
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

-- Dump completed on 2024-01-28 23:09:21
