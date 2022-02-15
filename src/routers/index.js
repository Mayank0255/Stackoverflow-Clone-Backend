const express = require('express');
const auth = require('./auth.router');
const users = require('./users.router');
const posts = require('./posts.router');
const tags = require('./tags.router');
const answers = require('./answers.router');
const comments = require('./comments.router');

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/tags', tags);
router.use('/posts/answers', answers);
router.use('/posts/comments', comments);

module.exports = router;
