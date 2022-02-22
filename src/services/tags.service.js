const { tagsRepository } = require('../repositories');

exports.retrieveAll = (result) => tagsRepository.retrieveAll(result);

exports.retrieveOne = (tagName, result) => tagsRepository.retrieveOne(tagName, result);
