const express = require('express');
const { check } = require('express-validator');
const { checkExistence } = require('../middleware');
const { usersController } = require('../controllers');

const router = express.Router();

/** @route      GET /api/users
 *  @desc       fetch all the users
 */
router.route('/')
  .get(usersController.getAllUsers);

/** @route      GET /api/users/:id
 *  @desc       fetch single user
 */
router.route('/:id')
  .get(usersController.getOneUser);

/** @route      POST /api/users/:id
 *  @desc       register a new user
 */
router.route('/')
  .post(
    check('username', 'Please include a valid username').isLength({ min: 5 }),
    check('password', 'Please enter a password with 5 or more characters').isLength({ min: 5 }),
    checkExistence,
    usersController.register,
  );

module.exports = router;
