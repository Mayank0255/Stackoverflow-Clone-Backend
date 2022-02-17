const repository = require('../repositories/users.repository');

exports.register = (newUser, result) => repository.register(newUser, result);

exports.login = async (newUser, result) => repository.login(newUser, result);

exports.retrieveAll = (result) => repository.retrieveAll(result);
exports.retrieveOne = (id, result) => repository.retrieveOne(id, result);

// eslint-disable-next-line camelcase
exports.loadUser = (user_id, result) => repository.loadUser(user_id, result);
