const getJwtToken = require('./jwt');
const repository = require('../repositories/users.repository');

exports.register = (newUser, result) => repository.register(newUser, result);

exports.login = async (newUser, result) => {
  const payload = await repository.login(newUser, result);
  // eslint-disable-next-line no-use-before-define
  getJwtToken(payload, 'User logged in', result);
};

exports.retrieveAll = (result) => repository.retrieveAll(result);
exports.retrieveOne = (id, result) => repository.retrieveOne(id, result);

// eslint-disable-next-line camelcase
exports.loadUser = (user_id, result) => repository.loadUser(user_id, result);
