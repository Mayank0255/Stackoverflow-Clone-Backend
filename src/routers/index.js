const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.router'));
router.use('/users', require('./users.router'));
router.use('/posts', require('./posts.router'));
router.use('/tags', require('./tags.router'));
router.use('/posts/answers', require('./answers.router'));
router.use('/posts/comments', require('./comments.router'));

module.exports = router;
