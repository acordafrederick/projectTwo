use magicDB;

CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `email` VARCHAR(255) NOT NULL UNIQUE,
`password` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`))
ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Leagues` (`id` INTEGER NOT NULL auto_increment , `leagueName` VARCHAR(255), `leaguePlayers` JSON,
`leaguePoints` INTEGER, `leagueStanding` VARCHAR(255), `leagueCurrentGames` INTEGER, `createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL, `UserId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`UserId`)
REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Gameinfos` (`id` INTEGER NOT NULL auto_increment , `playerName` VARCHAR(255), `checkedIn` TINYINT(1),
`commander` VARCHAR(255), `assignedTable` INTEGER NOT NULL, `points` INTEGER, `createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL, `LeagueId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`LeagueId`)
REFERENCES `Leagues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Commanders` (`id` INTEGER NOT NULL auto_increment , `commanderName` VARCHAR(255) NOT NULL UNIQUE,
`url` TEXT NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

INSERT INTO `Users` (`id`,`email`,`password`,`createdAt`,`updatedAt`)
VALUES
(DEFAULT,'test@gmail.com','$2a$10$52cI1hicMAMs/AESBoFU5uOEstJgySkYpvj/1arlxsEKCBWI9Beum','2018-03-14 22:25:48','2018-03-14 22:25:48'),
(DEFAULT,'vanessa@gmail.com','$2a$10$.9CrkCVl21mq3pp0qfdvpurfn2gnlNwerGrDOovGnrUTLTZm68KzO','2018-03-14 22:31:58','2018-03-14 22:31:58'),
(DEFAULT,'matt@gmail.com','$2a$10$HKawFSBKM823ae0bWulgBeu5Sks1Y0eF34OYe6saJHs93H1Ki/tFq','2018-03-15 19:46:13','2018-03-15 19:46:13'),
(DEFAULT,'jack@gmail.com','$2a$10$HQrp8AuxvTZrklms6NUHK.4StyT1gdaSBYlj5vlOXoeZ.thLtbWc2','2018-03-14 22:34:26','2018-03-14 22:34:26');

INSERT INTO `Leagues` (`id`,`leagueName`,`leaguePlayers`,`leaguePoints`,`leagueStanding`,`leagueCurrentGames`,`createdAt`,`updatedAt`, `UserId`)
VALUES
(NULL,'Austinerds','\"[\\\"Vanessa\\\",\\\"Fred\\\",\\\"Matt\\\",\\\"Bob\\\",\\\"Venkat\\\",\\\"Keith\\\",\\\"Doug\\\"]\"',85,'First',3,'2018-03-14 21:45:47','2018-03-14 21:45:47',2),
(NULL,'Cowboys','\"[\\\"Jill\\\",\\\"Jack\\\",\\\"Jim\\\",\\\"Joey\\\",\\\"Joseph\\\",\\\"Jeb\\\"]\"',35,'Second',2,'2018-03-14 21:45:47','2018-03-14 21:45:47',3);

-- JSON Array Format
-- '\"[\\\"Willy\\\",\\\"Willow\\\",\\\"Wiley\\\",\\\"Wonky\\\"]\"'

INSERT INTO `Gameinfos` (`id`,`playerName`,`checkedIn`,`commander`,`assignedTable`,`points`,`createdAt`,`updatedAt`,`LeagueId`)
VALUES
(NULL,'Vanessa',true,'Freya',1,5,'2018-03-14 22:46:24','2018-03-14 22:46:24',1),
(NULL,'Matt',true,'Mogus',1,6,'2018-03-14 22:46:24','2018-03-14 22:46:24',1);

INSERT INTO `Commanders` (`id`,`commanderName`,`url`,`createdAt`,`updatedAt`)
VALUES 
(NULL,'Freya','https://img.scryfall.com/cards/large/en/cma/111.jpg?1519869364','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Yahenni','https://img.scryfall.com/cards/large/en/aer/75.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Atraxa','https://img.scryfall.com/cards/large/en/c16/28.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Nekusar','https://img.scryfall.com/cards/large/en/c13/201.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Kaalia','https://img.scryfall.com/cards/large/en/cma/180.jpg?1519870270','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Zur','https://img.scryfall.com/cards/normal/en/mm3/204.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Jhoira','https://img.scryfall.com/cards/normal/en/dds/1.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Leovold','https://img.scryfall.com/cards/normal/en/cn2/77.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Maelstrom Wanderer','https://img.scryfall.com/cards/large/en/pca/101.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Karador','https://img.scryfall.com/cards/large/en/cmd/207.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Derevi','https://img.scryfall.com/cards/large/en/cma/176.jpg?1519870219','2018-03-18 20:09:01','2018-03-18 20:09:01'),
(NULL,'Uril','https://img.scryfall.com/cards/normal/en/arb/124.jpg?1517813031','2018-03-18 20:09:01','2018-03-18 20:09:01');