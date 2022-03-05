const express = require('express');
const { check } = require('express-validator');
const { auth, checkOwnership } = require('../middleware');
const { postsController } = require('../controllers');

const router = express.Router();

/** @route      GET /api/posts
 *  @desc       fetch all posts
 */
router.route('/')
  .get(postsController.getPosts);

/** @route      GET /api/posts/tag/:tagname
 *  @desc       fetch all posts of a specific tag
 */
router.route('/tag/:tagname')
  .get(postsController.getTagPosts);

/** @route      GET /api/posts/:id
 *  @desc       fetch a single post
 */
router.route('/:id')
  .get(postsController.getSinglePost);

/** @route      POST /api/posts/
 *  @desc       add a post
 */
router.route('/')
  .post(
    auth,
    check('title', 'Enter a title with minimum 15 characters').isLength({ min: 15 }),
    check('body', 'Enter a body with minimum 30 characters').isLength({ min: 30 }),
    postsController.addPost,
  );

/** @route      DELETE /api/posts/:id
 *  @desc       delete a post
 */
router.route('/:id')
  .delete(
    auth,
    checkOwnership,
    postsController.deletePost,
  );

module.exports = router;
