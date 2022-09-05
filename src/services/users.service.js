const bcrypt = require('bcryptjs');

const { responseHandler, getJwtToken } = require('../helpers');
const { UsersRepository } = require('../repositories');

exports.register = async (newUser, result) => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const insertObj = await UsersRepository.create(newUser);

  const payload = {
    user: {
      id: insertObj.dataValues.id,
    },
  };

  getJwtToken(payload, 'User registered', result);

  return payload;
};

exports.login = async (newUser, result) => {
  const user = await UsersRepository.retrieveOne({ username: newUser.username });

  if (user === null) {
    result(
      responseHandler(
        false,
        404,
        'User does not exists',
        null,
      ),
      null,
    );
    return null;
  }

  const isMatch = await bcrypt.compare(newUser.password, user.password);

  if (!isMatch) {
    result(
      responseHandler(false, 400, 'Incorrect password', null),
      null,
    );

    return null;
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  getJwtToken(payload, 'User logged in', result);

  return payload;
};

exports.retrieveAll = (result) => UsersRepository.retrieveAll(result);

exports.retrieveOne = async (id, result) => {
  await UsersRepository.incrementViews(id);

  const queryResult = await UsersRepository.retrieveOneWithCounts(id);

  return result(null, responseHandler(true, 200, 'Success', queryResult));
};

exports.loadUser = async (userId, result) => {
  const response = await UsersRepository.retrieveOne({ id: userId }, result);
  result(null, responseHandler(true, 200, 'Success', response));
};
