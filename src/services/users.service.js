const { usersRepository } = require('../repositories');

exports.register = (newUser, result) => usersRepository.register(newUser, result);

exports.login = async (newUser, result) => usersRepository.login(newUser, result);

exports.retrieveAll = (result) => usersRepository.retrieveAll(result);
exports.retrieveOne = (id, result) => usersRepository.retrieveOne(id, result);

// eslint-disable-next-line camelcase
exports.loadUser = (user_id, result) => usersRepository.loadUser(user_id, result);
