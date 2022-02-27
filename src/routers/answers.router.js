const express = require('express');
const { check } = require('express-validator');
const { auth, checkOwnership } = require('../middleware');
const { answersController } = require('../controllers');

const router = express.Router();

/** @route      GET /api/posts/answers/:id
 *  @desc       fetch all answers of a post
 */
router.route('/:id')
  .get(answersController.getAnswers);

/** @route      POST /api/posts/answers/:id
 *  @desc       add an answer to a post
 */
router.route('/:id')
  .post(
    auth,
    check('text', 'Answer is required').not().isEmpty(),
    answersController.addAnswer,
  );

/** @route      DELETE /api/posts/answers/:id
 *  @desc       delete an answer to a post
 */
router.route('/:id')
  .delete(
    auth,
    checkOwnership,
    answersController.deleteAnswer,
  );

module.exports = router;
