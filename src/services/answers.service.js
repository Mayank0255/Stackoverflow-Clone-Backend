const { AnswersRepository } = require('../repositories');

exports.create = (newAnswer, result) => AnswersRepository.create(newAnswer, result);

exports.remove = (id, result) => AnswersRepository.remove(id, result);

exports.retrieveAll = (postId, result) => AnswersRepository.retrieveAll(postId, result);
