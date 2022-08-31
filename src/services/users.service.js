const { UsersRepository } = require('../repositories');

exports.register = (newUser, result) => UsersRepository.register(newUser, result);

exports.login = async (newUser, result) => UsersRepository.login(newUser, result);

exports.retrieveAll = (result) => UsersRepository.retrieveAll(result);

exports.retrieveOne = (id, result) => UsersRepository.retrieveOne(id, result);

exports.loadUser = (userId, result) => UsersRepository.loadUser(userId, result);
