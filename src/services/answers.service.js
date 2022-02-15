const repository = require('../repositories/answers.repository');

exports.create = (newAnswer, result) => repository.create(newAnswer, result);

exports.remove = (id, result) => repository.remove(id, result);

exports.retrieveAll = (postId, result) => repository.retrieveAll(postId, result);
