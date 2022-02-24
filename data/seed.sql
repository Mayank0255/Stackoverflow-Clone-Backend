USE stack_overflow;

INSERT INTO users(id, username, password)
VALUES
("53e1deae-31da-4244-99e6-c0777da311b0", mayank", "$2a$10$9cQmVqe2Hz6aKX0YqYgvXeDKCbKHhj330ujNxDR7k/yubLoIWiswe"),
("09c1a199-df9c-48f2-aa01-28511b19da36", "rithik", "$2a$10$/mA3np4tWg7hsj.Jl9SGmO9BglTllhZxnLrHI7ATWT4VoraU2KC7i"),
("6963eed1-0ae8-4b13-ba33-065a56c3ccef", "shubh", "$2a$10$d0n1G5dNVTfGJEvrSxRU9OZrABWQ9ICBL24lONWYWrIUFp11Fx6c."),
("202598e5-b90b-4002-9def-8d6b496c028a", "jaidev", "$2a$10$iIGjYwWQUtrSMuh9RVQYNupBalea0Q6qeBzrtHhlw/5bpWWeRscDe"),
("077bd8af-c97b-4a4a-af3f-60e08fae95b9", "harshal", "$2a$10$dISBkirxSiwQnhy2m8SoHuJ2wgYGLkwsF9He5UWVOMLBo2NtKkKxa"),
("8404f9f6-cc20-478c-9ff8-1170f0e367b0", "hritik", "$2a$10$u9xQmmo6ejTv/ex021wq9eKZVpIpfwdpE6RrRqp5M6P/qOzDBXh22"),
("ec4789e5-e382-4985-85b4-31c0c4bbe745", "shadowsaver", "$2a$10$.qGwjVv/39t.nLEg5DFpkO3oz72MCNsOF6a6ijuMKBmluaH5qAfIq");

INSERT INTO posts(id, title, body, user_id) VALUES ("904b7e6e-0f20-4020-af7b-4bb775c02189", "LocalDate and LocalDateTime in a index which runs in EST vs UTC", "I am trying to understand LocalDate and LocalDateTime. Since they do not carry zone info, how does it work for now() on two different time zone.", "53e1deae-31da-4244-99e6-c0777da311b0");
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("java", "Java is a popular high-level programming language. Use this tag when you&#39;re having problems using or understanding the language itself. This tag is rarely used alone and is most often used in conjunction with [spring], [spring-boot], [jakarta-ee], [android], [javafx], [gradle] and [maven].");
SET @v2 := (SELECT id FROM tags WHERE tagname = "java");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO posts(id, title, body, user_id) VALUES ("ee7e47e4-6bfd-4f4f-a3ad-39dd5f37ad27", "Flutter: Specify ListTile height", "The issue is The tile here toke around more than half of the page which makes it looks inconsistent. I want to limit the height of the tile, I have tried putting them in a row and a container and it doesn't work. Any HELP will be appreciated.", "202598e5-b90b-4002-9def-8d6b496c028a");
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("flutter", "Flutter is an open-source UI software development kit created by Google. It is used to develop applications for Android, iOS, Linux, Mac, Windows, Google Fuchsia and the web from a single codebase.");
SET @v2 := (SELECT id FROM tags WHERE tagname = "flutter");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO posts(id, title, body, user_id) VALUES ("f961328f-f507-4a42-9a79-112ebbad3d9a", "Programmatically navigate using react router", "With react-router I can use the Link element to create links which are natively handled by react router. I see internally it calls this.context.transitionTo(...).", "077bd8af-c97b-4a4a-af3f-60e08fae95b9");
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("reactjs", "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.");
SET @v2 := (SELECT id FROM tags WHERE tagname = "reactjs");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO posts(id, title, body, user_id) VALUES ("bfc3f286-06e4-40c6-bd9a-220376b5fca8", "Why is processing a sorted array faster than processing an unsorted array?", "Here is a piece of C++ code that shows some very peculiar behavior. For some strange reason, sorting the data miraculously makes the code almost six times faster:", "6963eed1-0ae8-4b13-ba33-065a56c3ccef");
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("java", "Java is a popular high-level programming language. Use this tag when you&#39;re having problems using or understanding the language itself. This tag is rarely used alone and is most often used in conjunction with [spring], [spring-boot], [jakarta-ee], [android], [javafx], [gradle] and [maven].");
SET @v2 := (SELECT id FROM tags WHERE tagname = "java");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO posts(id, title, body, user_id) VALUES ("17d97d9b-7c3f-484a-aa48-0a8bf3e2c71c", "Is there a unique Android device ID?", "Do Android devices have a unique ID, and if so, what is a simple way to access it using Java?", "09c1a199-df9c-48f2-aa01-28511b19da36");
SET @v1 := (SELECT LAST_INSERT_ID());
INSERT IGNORE INTO tags(tagname, description) VALUES ("android", "Android is Google&#39;s mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT). For topics related to Android, use Android-specific tags such as android-intent, android-activity, android-adapter, etc. For questions other than development or programming, but related to the Android framework, use this link: https://android.stackexchange.com.");
SET @v2 := (SELECT id FROM tags WHERE tagname = "android");
INSERT INTO posttag(post_id, tag_id) VALUES(@v1, @v2);

INSERT INTO answers(id, body, user_id, post_id)
VALUES
("8ab4bf7e-0d27-4912-9108-c90abb6c9a96", "Just remove the Expanded Widget to avoid fill the space available and use a parent Container with a fixed height, the same as the itemExtent value:", "53e1deae-31da-4244-99e6-c0777da311b0", "bfc3f286-06e4-40c6-bd9a-220376b5fca8"),
("f9ce5ae6-fa99-4663-9f30-a741ce199a39", "There is a new useHistory hook in React Router >5.1.0 if you are using React >16.8.0 and functional components.", "09c1a199-df9c-48f2-aa01-28511b19da36", "17d97d9b-7c3f-484a-aa48-0a8bf3e2c71c"),
("ddb5150e-33fc-495a-9b7b-a6b7a970075b", "While you are correct that LocalDateTime and LocalDate don’t contain any time zone information, their now methods do use time zones. Either the one passed to them, or if you use the no-arg variant, the default time zone of the JVM.", "53e1deae-31da-4244-99e6-c0777da311b0", "f961328f-f507-4a42-9a79-112ebbad3d9a");

INSERT INTO comments(id, body, user_id, post_id)
VALUES
("300bd1f9-4ce2-4515-8bf3-d23d97e31d3b", "I need more information", "53e1deae-31da-4244-99e6-c0777da311b0", "bfc3f286-06e4-40c6-bd9a-220376b5fca8"),
("120cadb4-8cae-4a8b-b939-b398525d2adc", "I think I can help you in this", "53e1deae-31da-4244-99e6-c0777da311b0", "bfc3f286-06e4-40c6-bd9a-220376b5fca8"),
("38ec6a02-4c5a-4903-bf32-1ffbecc59993", "I need more information", "09c1a199-df9c-48f2-aa01-28511b19da36", "17d97d9b-7c3f-484a-aa48-0a8bf3e2c71c"),
("6c81e5e7-52db-42fe-bd13-eff3f8962ee9", "You sure you don't want funcs to be an array, if you're using numeric indices? Just a heads up.", "53e1deae-31da-4244-99e6-c0777da311b0", "17d97d9b-7c3f-484a-aa48-0a8bf3e2c71c"),
("2f6a8f13-3f58-464a-bbd7-66ee8002ebd8", "I need more information", "6963eed1-0ae8-4b13-ba33-065a56c3ccef", "904b7e6e-0f20-4020-af7b-4bb775c02189");
