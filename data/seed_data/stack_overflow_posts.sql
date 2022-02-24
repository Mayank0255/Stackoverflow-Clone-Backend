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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(250) NOT NULL,
  `body` text NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('621b42d0-718d-407b-9198-cda575a2b184','Here is a piece of C++ code that shows some very peculiar behavior. For some strange reason, sorting the data (before the timed region) miraculously makes the loop almost six times faster.','<pre><code>#include &lt;algorithm&gt;</code></pre>\n<pre><code>#include &lt;ctime&gt;</code></pre>\n<pre><code>#include &lt;iostream&gt;</code></pre>\n<pre><code>int main()</code></pre>\n<pre><code>{</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;// Generate data</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;const unsigned arraySize = 32768;</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;int data[arraySize];</code></pre>\n<pre><code><br></code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;for (unsigned c = 0; c &lt; arraySize; ++c)</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data[c] = std::rand() % 256;</code></pre>\n<pre><code><br></code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;// !!! With this, the next loop runs faster.</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;std::sort(data, data + arraySize);</code></pre>\n<pre><code><br></code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;// Test</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;clock_t start = clock();</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;long long sum = 0;</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;for (unsigned i = 0; i &lt; 100000; ++i)</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;{</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (unsigned c = 0; c &lt; arraySize; ++c)</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ &nbsp;&nbsp;// Primary loop</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (data[c] &gt;= 128)</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sum += data[c];</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;}</code></pre>\n<pre><code><br></code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;double elapsedTime = static_cast&lt;double&gt;(clock()-start) / CLOCKS_PER_SEC;</code></pre>\n<pre><code><br></code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; elapsedTime &lt;&lt; \'\\n\';</code></pre>\n<pre><code>&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; \"sum = \" &lt;&lt; sum &lt;&lt; \'\\n\';</code></pre>\n<pre><code>}</code></pre>\n<ul>\n  <li>&nbsp;the code runs in 11.54 seconds&nbsp;</li>\n  <li>&nbsp;With the sorted data, the code runs in 1.93 seconds&nbsp;</li>\n</ul>',2,'2022-02-22 17:55:10','2022-02-22 18:02:51','c9fa9727-c3bf-4823-b918-73300ab67afa'),('70355387-ddb2-46b5-96a0-8e221826aa84','How do I undo the most recent local commits in Git?','<p>&nbsp;I accidentally <strong>committed the wrong files</strong> to <a href=\"https://en.wikipedia.org/wiki/Git\" rel=\"noreferrer\"><u>Git</u></a> but didn\'t push the commit to the index yet.</p>\n<p>How can I <strong>undo those commits from the local repository</strong>?</p>\n<p>The only way seems to be to copy the edits in some kind of GUI text editor, then wipe the whole local clone, then re-clone the repository, then re-applying the edits. However,<br>\n</p>\n<ul>\n  <li>This can cause data loss.</li>\n  <li>It\'s very hard to do this when only an accidental was run.</li>\n</ul>\n<p>Is there a better way?</p>',0,'2022-02-22 17:56:03','2022-02-22 17:56:03','c9fa9727-c3bf-4823-b918-73300ab67afa'),('9db4e466-85bd-4fca-a1c0-4e15f070a0a5','How do I delete a Git branch locally and remotely?','<p>I want to delete a branch both locally and remotely.</p>\n<h3>Failed Attempts to Delete a Remote Branch</h3>\n<p>&nbsp;What should I do differently to successfully delete the branch both locally and remotely?&nbsp;</p>',0,'2022-02-22 17:57:21','2022-02-22 17:57:21','c9fa9727-c3bf-4823-b918-73300ab67afa'),('ba8f4f96-8446-4007-8467-d389bb99c9cf','What is the correct JSON content type?','<p>I\'ve been messing around with <a href=\"http://en.wikipedia.org/wiki/JSON\" rel=\"noreferrer\"><u>JSON</u></a> for some time, just pushing it out as text and it hasn\'t hurt anybody (that I know of), but I\'d like to start doing things properly.</p>\n<p>I have seen <em>so</em> many purported \"standards\" for the JSON content type:<br>\n<br>\nBut which one is correct, or best? I gather that there are security and browser support issues varying between them.&nbsp;</p>\n<p>I know there\'s a similar question, <a href=\"https://stackoverflow.com/questions/404470/what-mime-type-if-json-is-being-returned-by-a-rest-api\"><u><em>What MIME type if JSON is being returned by a REST API?</em></u></a>, but I\'d like a slightly more targeted answer.&nbsp;</p>',2,'2022-02-22 18:02:04','2022-02-22 18:06:03','483198ed-01de-4aff-9c55-a819271e46a7'),('f6c5f9b6-6021-4668-bc35-60aeba5f56ff','What does the \"yield\" keyword do?','<p>&nbsp;What is the use of the yield keyword in Python? What does it do?</p>\n<p>For example, I\'m trying to understand this code</p>\n<p>And this is the caller:&nbsp;</p>\n<p>&nbsp;What happens when the method is called? Is a list returned? A single element? Is it called again? When will subsequent calls stop?&nbsp;</p>',2,'2022-02-22 18:00:40','2022-02-22 18:06:35','907a2032-ba37-4784-aad4-bd2764d631e8'),('f86b89aa-4948-47f4-a144-2ef48044f516','What is the difference between \'git pull\' and \'git fetch\'?','<p>&nbsp;What are the differences between&nbsp;</p>\n<pre><code>git pull</code></pre>\n<p>and&nbsp;</p>\n<pre><code>git fetch</code></pre>',0,'2022-02-22 17:58:54','2022-02-22 17:58:54','b3fd5056-fd6b-4453-91cf-d1c015333867');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
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
