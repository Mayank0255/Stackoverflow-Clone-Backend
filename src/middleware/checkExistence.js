const { responseHandler } = require('../helpers');
const { UsersModelSequelize } = require('../models');

const checkExistence = async (req, res, next) => {
  const { username } = req.body;

  const user = await UsersModelSequelize
    .findOne({ where: { username } })
    .catch((error) => {
      console.log(error.message);
      return res
        .status(error.statusCode)
        .json(responseHandler(false, error.statusCode, 'Some error occurred while logging in the user.', null));
    });

  if (user !== null) {
    return res
      .status(400)
      .json(responseHandler(false, 400, 'User already exists', null));
  }

  next();
};

module.exports = checkExistence;
