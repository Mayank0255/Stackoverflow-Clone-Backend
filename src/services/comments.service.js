const repository = require('../repositories/comments.repository');

exports.create = (newComment, result) => repository.create(newComment, result);

exports.remove = (id, result) => repository.remove(id, result);

exports.retrieveAll = (postId, result) => repository.retrieveAll(postId, result);
