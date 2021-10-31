const repository = require('../repositories/comments.repository');

const create = (newComment, result) => repository.create(newComment, result);

const remove = (id, result) => repository.remove(id, result);

const retrieveAll = (postId, result) => repository.retrieveAll(postId, result);

module.exports = {
  create,
  remove,
  retrieveAll,
};
