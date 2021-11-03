const repository = require('../repositories/answers.repository');

const create = (newAnswer, result) => repository.create(newAnswer, result);

const remove = (id, result) => repository.remove(id, result);

const retrieveAll = (postId, result) => repository.retrieveAll(postId, result);

module.exports = {
  create,
  remove,
  retrieveAll,
};
