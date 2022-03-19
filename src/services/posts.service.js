const { postsRepository } = require('../repositories');

exports.create = (newPost, result) => {
  postsRepository.create(newPost, result);
};

exports.remove = (id, result) => postsRepository.remove(id, result);

exports.retrieveOne = (postId, result) => postsRepository.retrieveOne(postId, result);

exports.retrieveAll = (result) => postsRepository.retrieveAll(result);

exports.retrieveAllTag = (tagName, result) => postsRepository.retrieveAllTag(tagName, result);
