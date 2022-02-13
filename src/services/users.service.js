const jwt = require('jsonwebtoken');
const config = require('config');
const helperFunction = require('../helpers/helperFunction');
const repository = require('../repositories/users.repository');

const register = async (newUser, result) => {
  const payload = await repository.register(newUser, result);
  // eslint-disable-next-line no-use-before-define
  getJwtToken(payload, 'User registered', result);
};

const login = async (newUser, result) => {
  const payload = await repository.login(newUser, result);
  // eslint-disable-next-line no-use-before-define
  getJwtToken(payload, 'User logged in', result);
};

const retrieveAll = (result) => repository.retrieveAll(result);
const retrieveOne = (id, result) => repository.retrieveOne(id, result);

const loadUser = (userId, result) => repository.loadUser(userId, result);

const getJwtToken = (payload, logMessage, result) => {
  jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: 3600 },
    (error, token) => {
      if (error) {
        console.log('error: ', error);
        result(
          helperFunction.responseHandler(
            false,
            error.statusCode,
            error.message,
            null,
          ),
          null,
        );
        return;
      }
      result(
        null,
        helperFunction.responseHandler(true, 200, logMessage, { token }),
      );
    },
  );
};

module.exports = {
  register,
  login,
  retrieveAll,
  retrieveOne,
  loadUser,
};
