const { PostsRepository } = require('../repositories');

exports.create = (newPost, result) => {
  PostsRepository.create(newPost, result);
};

exports.remove = (id, result) => PostsRepository.remove(id, result);

exports.retrieveOne = (postId, result) => PostsRepository.retrieveOne(postId, result);

exports.retrieveAll = (result) => PostsRepository.retrieveAll(result);

exports.retrieveAllTag = (tagName, result) => PostsRepository.retrieveAllTag(tagName, result);
