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

 Date: 22/03/2019 16:15:44
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
  `Image` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Icon` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
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
INSERT INTO `characters` VALUES (1, 'Soldier 76', 200, 0, 1, 1, 1, 0, '', '');
INSERT INTO `characters` VALUES (2, 'Tracer', 150, 0, 1, 0, 2, 0, '', '');
INSERT INTO `characters` VALUES (3, 'Hanzo', 200, 0, 1, 1, 3, 0, '', '');
INSERT INTO `characters` VALUES (4, 'Widowmaker', 200, 0, 1, 1, 4, 0, '', '');
INSERT INTO `characters` VALUES (5, 'Mercy', 200, 0, 1, 1, 5, 0, '', '');
INSERT INTO `characters` VALUES (6, 'Ashe', 200, 0, 1, 1, 7, 0, '', '');
INSERT INTO `characters` VALUES (7, 'Bastion', 200, 100, 2, 0, 9, 0, '', '');
INSERT INTO `characters` VALUES (8, 'Baptiste', 200, 0, 1, 0, 8, 0, '', '');

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
INSERT INTO `weapons` VALUES (2, 'Pulse Pistols', 0, 0, 40, 6, 20, NULL);
INSERT INTO `weapons` VALUES (3, 'Storm Bow', 1, 0, NULL, 125, 20, NULL);
INSERT INTO `weapons` VALUES (4, 'Widow\'s kiss', 1, 0, 30, 125, 9, NULL);
INSERT INTO `weapons` VALUES (5, 'Caduceus Staff', 0, 0, NULL, NULL, NULL, '50');
INSERT INTO `weapons` VALUES (7, 'The Viper', 1, 0, 12, 40, 4, NULL);
INSERT INTO `weapons` VALUES (8, 'Biotic Launcher', 0, 0, 45, 12, 9.1, '60');
INSERT INTO `weapons` VALUES (9, 'Sentry', 1, 0, 300, 15, 30, NULL);

SET FOREIGN_KEY_CHECKS = 1;
