const express = require('express');
const { tagsController } = require('../controllers');

const router = express.Router();

/** @route      GET /api/tags
 *  @desc       fetch all tags
 */
router.route('/')
  .get(tagsController.getTags);

/** @route      GET /api/posts/:id
 *  @desc       fetch a single post
 */
router.route('/:tagname')
  .get(tagsController.getSingleTag);

module.exports = router;
