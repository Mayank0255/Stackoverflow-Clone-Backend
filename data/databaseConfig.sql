CREATE DATABASE stack_overflow;

USE stack_overflow;

CREATE TABLE `users` (
    `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `username` varchar(190) NOT NULL,
    `password` varchar(100) NOT NULL,
    `gravatar` varchar(190) NOT NULL,
    `views` int NOT NULL DEFAULT '0',
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `posts` (
    `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `title` varchar(190) NOT NULL,
    `body` text NOT NULL,
    `views` int NOT NULL DEFAULT '0',
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE
    SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `answers` (
    `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `body` text NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `post_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `post_id` (`post_id`),
    CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `comments` (
    `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `body` text NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `post_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `post_id` (`post_id`),
    CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tags` (
    `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `tagname` varchar(190) NOT NULL,
    `description` text NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `tagname` (`tagname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `posttag` (
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `post_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `tag_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    PRIMARY KEY (`post_id`,`tag_id`),
    KEY `tag_id` (`tag_id`),
    CONSTRAINT `posttag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `posttag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;