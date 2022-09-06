const { responseHandler } = require('../helpers');
const { UsersRepository } = require('../repositories');

const checkExistence = async (req, res, next) => {
  const { username } = req.body;

  const user = await UsersRepository.retrieveOne({ username });

  if (user !== null) {
    return res
      .status(400)
      .json(responseHandler(false, 400, 'User already exists', null));
  }

  next();
};

module.exports = checkExistence;
