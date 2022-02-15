const jwt = require('jsonwebtoken');
const config = require('config');
const responseHandler = require('../helpers/responseHandler');
const repository = require('../repositories/users.repository');

exports.register = async (newUser, result) => {
  const payload = await repository.register(newUser, result);
  // eslint-disable-next-line no-use-before-define
  getJwtToken(payload, 'User registered', result);
};

exports.login = async (newUser, result) => {
  const payload = await repository.login(newUser, result);
  // eslint-disable-next-line no-use-before-define
  getJwtToken(payload, 'User logged in', result);
};

exports.retrieveAll = (result) => repository.retrieveAll(result);
exports.retrieveOne = (id, result) => repository.retrieveOne(id, result);

exports.loadUser = (userId, result) => repository.loadUser(userId, result);

const getJwtToken = (payload, logMessage, result) => {
  jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: 3600 },
    (error, token) => {
      if (error) {
        console.log('error: ', error);
        result(
          responseHandler(
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
        responseHandler(true, 200, logMessage, { token }),
      );
    },
  );
};
