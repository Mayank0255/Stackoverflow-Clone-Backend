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
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES ('30f9e438-e11a-48f5-9c69-ce2a5fd75c06','<p>&nbsp;With a sorted array, the condition <strong>data[c] &gt;= 128</strong> is first <strong>false </strong>for a streak of values, then becomes <strong>true </strong>for all later values. That\'s easy to predict. With an unsorted array, you pay for the branching cost.&nbsp;</p>','2022-02-22 18:04:14','2022-02-22 18:04:14','a210dae5-20f5-42bf-9bba-03433f7e1fc8','621b42d0-718d-407b-9198-cda575a2b184'),('9af5ca1c-875b-4fbe-898a-9f9e85f73d9d','<p>&nbsp;</p>\n<p>To understand what <code>yield</code> does, you must understand what <em>generators</em> are. And before you can understand generators, you must understand <em>iterables</em>.</p>\n<h2>Iterables</h2>\n<p>When you create a list, you can read its items one by one. Reading its items one by one is called iteration:</p>\n<pre><code>&gt;&gt;&gt; mylist = [1, 2, 3]<br>\n&gt;&gt;&gt; for i in mylist:<br>\n... &nbsp;&nbsp;&nbsp;print(i)<br>\n1<br>\n2<br>\n3<br>\n</code></pre>\n<p><code>mylist</code> is an <em>iterable</em>. When you use a list comprehension, you create a list, and so an iterable:</p>\n<pre><code>&gt;&gt;&gt; mylist = [x*x for x in range(3)]<br>\n&gt;&gt;&gt; for i in mylist:<br>\n... &nbsp;&nbsp;&nbsp;print(i)<br>\n0<br>\n1<br>\n4<br>\n</code></pre>\n<p>Everything you can use \"<code>for... in...</code>\" on is an iterable; <code>lists</code>, <code>strings</code>, files...</p>\n<p>These iterables are handy because you can read them as much as you wish, but you store all the values in memory and this is not always what you want when you have a lot of values.</p>\n<h2>Generators</h2>\n<p>Generators are iterators, a kind of iterable <strong>you can only iterate over once</strong>. Generators do not store all the values in memory, <strong>they generate the values on the fly</strong>:</p>\n<pre><code>&gt;&gt;&gt; mygenerator = (x*x for x in range(3))<br>\n&gt;&gt;&gt; for i in mygenerator:<br>\n... &nbsp;&nbsp;&nbsp;print(i)<br>\n0<br>\n1<br>\n4<br>\n</code></pre>\n<p>It is just the same except you used <code>()</code> instead of <code>[]</code>. BUT, you <strong>cannot</strong> perform <code>for i in mygenerator</code> a second time since generators can only be used once: they calculate 0, then forget about it and calculate 1, and end calculating 4, one by one.</p>\n<h2>Yield</h2>\n<p><code>yield</code> is a keyword that is used like <code>return</code>, except the function will return a generator.</p>\n<pre><code>&gt;&gt;&gt; def create_generator():<br>\n... &nbsp;&nbsp;&nbsp;mylist = range(3)<br>\n... &nbsp;&nbsp;&nbsp;for i in mylist:<br>\n... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yield i*i<br>\n...<br>\n&gt;&gt;&gt; mygenerator = create_generator() # create a generator<br>\n&gt;&gt;&gt; print(mygenerator) # mygenerator is an object!<br>\n&lt;generator object create_generator at 0xb7555c34&gt;<br>\n&gt;&gt;&gt; for i in mygenerator:<br>\n... &nbsp;&nbsp;&nbsp;&nbsp;print(i)<br>\n0<br>\n1<br>\n4<br>\n</code></pre>\n<p>Here it\'s a useless example, but it\'s handy when you know your function will return a huge set of values that you will only need to read once.</p>','2022-02-22 18:07:07','2022-02-22 18:07:07','f39238a4-90df-4cf6-9ab1-fdd43a380532','f6c5f9b6-6021-4668-bc35-60aeba5f56ff'),('b99f017c-342a-487b-9068-c0aa9e67b529','<p><strong>For JSON:</strong></p>\n<pre><code>Content-Type: application/json<br>\n</code></pre>\n<p><strong>For</strong> <a href=\"http://en.wikipedia.org/wiki/JSONP\" rel=\"noreferrer\"><u><strong>JSON-P</strong></u></a><strong>:</strong></p>\n<pre><code>Content-Type: application/javascript</code></pre>','2022-02-22 18:06:10','2022-02-22 18:06:10','f39238a4-90df-4cf6-9ab1-fdd43a380532','ba8f4f96-8446-4007-8467-d389bb99c9cf'),('e0493ab5-b65b-4224-b81d-498e80de13c6','<p><a href=\"http://www.iana.org/\" rel=\"noreferrer\"><u>IANA</u></a> has registered the official MIME Type for JSON as <code><strong>application/json</strong></code>.</p>\n<p>When asked about why not <code>text/json</code>, Crockford seems to have said JSON is not really JavaScript nor text and also IANA was more likely to hand out <code>application/*</code> than <code>text/*</code>.</p>\n<p>More resources:</p>\n<ul>\n  <li><a href=\"http://www.iana.org/assignments/media-types/application/\" rel=\"noreferrer\"><u>Media Types</u></a></li>\n  <li><a href=\"http://www.ietf.org/rfc/rfc4627.txt\" rel=\"noreferrer\"><u>Request for Comments 4627</u></a></li>\n  <li><a href=\"http://bluesmoon.livejournal.com/227190.html\" rel=\"noreferrer\"><u>bluesmoon: JSON has a type</u></a></li>\n</ul>','2022-02-22 18:05:18','2022-02-22 18:05:18','a210dae5-20f5-42bf-9bba-03433f7e1fc8','ba8f4f96-8446-4007-8467-d389bb99c9cf');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
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
