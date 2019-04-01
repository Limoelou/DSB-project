/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : dsb

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 01/04/2019 18:52:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `Id` int(255) NOT NULL,
  `Username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Lootbox` int(255) NOT NULL,
  `Gold` int(255) NOT NULL,
  `Level` int(255) NOT NULL,
  `Rank` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (1, 'Limoelou', 'Limouiledh', 150, 5000, 456, 'DoudouMasta');
INSERT INTO `account` VALUES (2, 'Skinz', 'Mandoled', 8, 3, 6000, 'GrandMandol');
INSERT INTO `account` VALUES (3, 'Jacket', 'MelenFarmer', 0, 60000, 890, 'GenjiOTP');
INSERT INTO `account` VALUES (4, 'Patrick', 'Sebastien', 39, 9, 39, 'Gold');
INSERT INTO `account` VALUES (5, 'Simon', 'lePetitPrincedu69', 4, 499, 49, 'Grand Master');
INSERT INTO `account` VALUES (6, 'Francois', 'asiatique', 1, 1, 1385, 'Paper');
INSERT INTO `account` VALUES (7, 'simon', 'petitjoyeux', 3, 398321, 39, 'Gold');
INSERT INTO `account` VALUES (1, 'Limoelou', 'Limouiled', 150, 5000, 456, 'DoudouMasta');
INSERT INTO `account` VALUES (2, 'Skinz', 'Mandoled', 8, 3, 6000, 'GrandMandol');
INSERT INTO `account` VALUES (3, 'Jacket', 'MelenFarmer', 0, 60000, 890, 'GenjiOTP');
INSERT INTO `account` VALUES (4, 'Patrick', 'Sebastien', 39, 9, 39, 'Gold');
INSERT INTO `account` VALUES (5, 'Simon', 'lePetitPrincedu69', 4, 499, 49, 'Grand Master');
INSERT INTO `account` VALUES (6, 'Francois', 'asiatique', 1, 1, 1385, 'Paper');
INSERT INTO `account` VALUES (7, 'simon', 'petitjoyeux', 3, 398321, 39, 'Gold');

-- ----------------------------
-- Table structure for accountbanned
-- ----------------------------
DROP TABLE IF EXISTS `accountbanned`;
CREATE TABLE `accountbanned`  (
  `Username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `BanDate` date NOT NULL,
  `Reason` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of accountbanned
-- ----------------------------
INSERT INTO `accountbanned` VALUES ('Jacket', '2019-03-04', 'Toxicity');

-- ----------------------------
-- Table structure for characters
-- ----------------------------
DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters`  (
  `Id` int(11) NOT NULL,
  `Name` varchar(11) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `LifePoints` int(11) NOT NULL,
  `Armor` int(11) NOT NULL,
  `MapId` int(11) NOT NULL,
  `SkinId` int(11) NOT NULL,
  `WeaponId` int(255) NOT NULL,
  `Shield` int(11) NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `WeaponId`(`WeaponId`) USING BTREE,
  INDEX `WeaponId_2`(`WeaponId`) USING BTREE,
  INDEX `WeaponId_3`(`WeaponId`) USING BTREE,
  INDEX `WeaponId_4`(`WeaponId`) USING BTREE,
  CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`WeaponId`) REFERENCES `weapons` (`WeaponId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of characters
-- ----------------------------
INSERT INTO `characters` VALUES (1, 'Soldier 76', 200, 0, 1, 1, 1, 0);
INSERT INTO `characters` VALUES (2, 'Tracer', 150, 0, 1, 0, 2, 0);
INSERT INTO `characters` VALUES (3, 'Hanzo', 200, 0, 1, 1, 3, 0);
INSERT INTO `characters` VALUES (4, 'Widowmaker', 200, 0, 1, 1, 4, 0);
INSERT INTO `characters` VALUES (5, 'Mercy', 200, 0, 1, 1, 5, 0);
INSERT INTO `characters` VALUES (6, 'Ashe', 200, 0, 1, 1, 7, 0);
INSERT INTO `characters` VALUES (7, 'Bastion', 200, 100, 2, 0, 9, 0);
INSERT INTO `characters` VALUES (8, 'Baptiste', 200, 0, 1, 0, 8, 0);
INSERT INTO `characters` VALUES (9, 'Genji', 200, 0, 4, 0, 6, 0);
INSERT INTO `characters` VALUES (10, 'Orisa', 200, 200, 4, 3, 10, 0);
INSERT INTO `characters` VALUES (11, 'D.Va', 400, 200, 2, 1, 11, 0);
INSERT INTO `characters` VALUES (12, 'Reinhardt', 300, 200, 2, 2, 12, 0);
INSERT INTO `characters` VALUES (13, 'Roadhog', 600, 0, 2, 1, 13, 0);
INSERT INTO `characters` VALUES (14, 'Winston', 400, 100, 3, 2, 14, 0);
INSERT INTO `characters` VALUES (15, 'Wrecking Ba', 500, 600, 3, 2, 15, 0);
INSERT INTO `characters` VALUES (16, 'Zarya', 200, 0, 3, 0, 16, 200);
INSERT INTO `characters` VALUES (17, 'Doomfist', 250, 0, 4, 0, 17, 0);
INSERT INTO `characters` VALUES (18, 'Junkrat', 200, 0, 3, 2, 18, 0);
INSERT INTO `characters` VALUES (19, 'McCree', 200, 0, 3, 0, 19, 0);
INSERT INTO `characters` VALUES (20, 'Mei', 250, 0, 4, 1, 20, 0);
INSERT INTO `characters` VALUES (21, 'Pharah', 200, 0, 4, 1, 21, 0);
INSERT INTO `characters` VALUES (22, 'Reaper', 250, 0, 4, 4, 22, 0);
INSERT INTO `characters` VALUES (23, 'Sombra', 200, 0, 20, 0, 23, 0);
INSERT INTO `characters` VALUES (24, 'Symmetra', 100, 0, 5, 0, 24, 100);
INSERT INTO `characters` VALUES (25, 'Torbjorn', 200, 50, 6, 4, 25, 0);
INSERT INTO `characters` VALUES (26, 'Ana', 200, 0, 7, 0, 26, 0);
INSERT INTO `characters` VALUES (27, 'Brigitte', 200, 50, 8, 0, 27, 0);
INSERT INTO `characters` VALUES (28, 'Lucio', 200, 0, 9, 1, 28, 0);
INSERT INTO `characters` VALUES (29, 'Moira', 200, 0, 10, 1, 29, 0);
INSERT INTO `characters` VALUES (30, 'Zenyatta', 50, 0, 10, 1, 30, 150);

-- ----------------------------
-- Table structure for maps
-- ----------------------------
DROP TABLE IF EXISTS `maps`;
CREATE TABLE `maps`  (
  `MapId` int(255) NOT NULL,
  `Name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Type` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`MapId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maps
-- ----------------------------
INSERT INTO `maps` VALUES (1, 'Rialto', 'Escort');
INSERT INTO `maps` VALUES (2, 'Numbani', 'Hybrid');
INSERT INTO `maps` VALUES (3, 'Hanamura', 'Assault');
INSERT INTO `maps` VALUES (4, 'Horizon Lunar Colony', 'Assault');
INSERT INTO `maps` VALUES (5, 'Route 66', 'Escort');
INSERT INTO `maps` VALUES (6, 'Gibraltar', 'Escort');
INSERT INTO `maps` VALUES (7, 'Busan', 'Control');
INSERT INTO `maps` VALUES (8, 'King\'s Row ', 'Hybrid');
INSERT INTO `maps` VALUES (9, 'Oasis', 'Control');
INSERT INTO `maps` VALUES (10, 'Dorado', 'Escort');
INSERT INTO `maps` VALUES (11, 'Ilios ', 'Control');
INSERT INTO `maps` VALUES (12, 'Lijiang Tower', 'Control');
INSERT INTO `maps` VALUES (13, 'Junkertown', 'Escort');
INSERT INTO `maps` VALUES (14, 'Volskaya industries', 'Assault');
INSERT INTO `maps` VALUES (15, 'Temple of Anubis', 'Assault');
INSERT INTO `maps` VALUES (16, 'Paris', 'Assault');
INSERT INTO `maps` VALUES (17, 'Blizzard World', 'Hybrid');
INSERT INTO `maps` VALUES (18, 'Nepal', 'Control');
INSERT INTO `maps` VALUES (19, 'Eichenwalde', 'Hybrid');
INSERT INTO `maps` VALUES (20, 'Hollywood', 'Hybrid');
INSERT INTO `maps` VALUES (21, 'Ayutthaya', 'Arcade');
INSERT INTO `maps` VALUES (22, 'Black Forest', 'Arcade');
INSERT INTO `maps` VALUES (23, 'Castillo', 'Arcade');
INSERT INTO `maps` VALUES (24, 'Chateau Guillard', 'Arcade');
INSERT INTO `maps` VALUES (25, 'Ecopoint : Antarctica', 'Arcade');
INSERT INTO `maps` VALUES (26, 'Necropolis', 'Arcade');
INSERT INTO `maps` VALUES (27, 'Petra', 'Arcade');

-- ----------------------------
-- Table structure for purchases
-- ----------------------------
DROP TABLE IF EXISTS `purchases`;
CREATE TABLE `purchases`  (
  `Username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Date` date NOT NULL,
  `LootboxNumber` int(255) NOT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of purchases
-- ----------------------------
INSERT INTO `purchases` VALUES ('Limoelou', '2015-05-13', 5);
INSERT INTO `purchases` VALUES ('Jacket', '2019-03-22', 6);
INSERT INTO `purchases` VALUES ('Jacket', '2019-03-23', 23);
INSERT INTO `purchases` VALUES ('Limoelou', '2019-03-17', 19);
INSERT INTO `purchases` VALUES ('Skinz', '2019-03-24', 9);
INSERT INTO `purchases` VALUES ('Skinz', '2019-03-19', 5);

-- ----------------------------
-- Table structure for weapons
-- ----------------------------
DROP TABLE IF EXISTS `weapons`;
CREATE TABLE `weapons`  (
  `WeaponId` int(255) NOT NULL,
  `Name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `CanHeadshot` tinyint(1) NULL DEFAULT NULL,
  `IsMelee` tinyint(1) NULL DEFAULT NULL,
  `Magazine` int(255) NULL DEFAULT NULL,
  `DamagePerHit` int(255) NULL DEFAULT NULL,
  `FireRate` double NULL DEFAULT NULL,
  `HealRate` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`WeaponId`) USING BTREE,
  INDEX `Id`(`WeaponId`) USING BTREE,
  INDEX `WeaponId`(`WeaponId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of weapons
-- ----------------------------
INSERT INTO `weapons` VALUES (1, 'Pulse Rifle', 1, 0, 25, 20, 9, NULL);
INSERT INTO `weapons` VALUES (2, 'Pulse Pistols', 1, 0, 40, 6, 20, NULL);
INSERT INTO `weapons` VALUES (3, 'Storm Bow', 1, 0, NULL, 125, 20, NULL);
INSERT INTO `weapons` VALUES (4, 'Widow\'s kiss', 1, 0, 30, 125, 9, NULL);
INSERT INTO `weapons` VALUES (5, 'Caduceus Staff', 0, 0, NULL, NULL, NULL, '50');
INSERT INTO `weapons` VALUES (6, 'Shuriken', 1, 0, 24, 28, 1.33, NULL);
INSERT INTO `weapons` VALUES (7, 'The Viper', 1, 0, 12, 40, 4, NULL);
INSERT INTO `weapons` VALUES (8, 'Biotic Launcher', 0, 0, 45, 12, 9.1, '60');
INSERT INTO `weapons` VALUES (9, 'Sentry', 1, 0, 300, 15, 30, NULL);
INSERT INTO `weapons` VALUES (10, 'Fusion Driver', 1, 0, 150, 11, 12, NULL);
INSERT INTO `weapons` VALUES (11, 'Fusion Cannons', 1, 0, NULL, 2, 6.67, NULL);
INSERT INTO `weapons` VALUES (12, 'Rocket Hammer', 0, 1, NULL, 75, 0.9, NULL);
INSERT INTO `weapons` VALUES (13, 'Scrap Gun', 1, 0, 5, 150, 1.43, NULL);
INSERT INTO `weapons` VALUES (14, 'Tesla Cannons', 0, 0, 100, 3, 20, NULL);
INSERT INTO `weapons` VALUES (15, 'Quad Cannons', 1, 0, 80, 5, 25, NULL);
INSERT INTO `weapons` VALUES (16, 'Particle Cannon', 0, 0, 100, 5, 20, NULL);
INSERT INTO `weapons` VALUES (17, 'Hand Cannon', 1, 0, 4, 66, 3.125, NULL);
INSERT INTO `weapons` VALUES (18, 'Frag Launcher', 0, 0, 5, 130, 1.5, NULL);
INSERT INTO `weapons` VALUES (19, 'Peacekeeper', 1, 0, 6, 70, 2, NULL);
INSERT INTO `weapons` VALUES (20, 'Endothermic Blaster', 1, 0, 200, 75, 0.8, NULL);
INSERT INTO `weapons` VALUES (21, 'Rocket Launcher', 0, 0, 6, 120, 1.25, NULL);
INSERT INTO `weapons` VALUES (22, 'Hellfire Shotgun', 1, 0, 8, 140, 2, NULL);
INSERT INTO `weapons` VALUES (23, 'Machine Pistol', 1, 0, 60, 8, 20, NULL);
INSERT INTO `weapons` VALUES (24, 'Photon Projector', 0, 0, 70, 195, 7, NULL);
INSERT INTO `weapons` VALUES (25, 'Rivet Gun', 1, 0, 18, 70, 1.67, NULL);
INSERT INTO `weapons` VALUES (26, 'Biotic Rifle', 0, 0, 14, 70, 1.25, '75');
INSERT INTO `weapons` VALUES (27, 'Rocket Flail', 0, 1, NULL, 35, 1.4, '16.67');
INSERT INTO `weapons` VALUES (28, 'Sonic Amplifier', 1, 0, 20, 20, 1.1, '16');
INSERT INTO `weapons` VALUES (29, 'Biotic Grasp', 0, 0, NULL, 50, 11, '80');
INSERT INTO `weapons` VALUES (30, 'Orb Of Destruction', 1, 0, 20, 48, 2.5, '30');

SET FOREIGN_KEY_CHECKS = 1;
