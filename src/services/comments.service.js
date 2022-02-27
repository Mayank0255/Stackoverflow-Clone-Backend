const { commentsRepository } = require('../repositories');

exports.create = (newComment, result) => commentsRepository.create(newComment, result);

exports.remove = (id, result) => commentsRepository.remove(id, result);

exports.retrieveAll = (postId, result) => commentsRepository.retrieveAll(postId, result);
