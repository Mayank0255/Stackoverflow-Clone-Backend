const repository = require('../repositories/tags.repository');

exports.retrieveAll = (result) => repository.retrieveAll(result);

exports.retrieveOne = (tagName, result) => repository.retrieveOne(tagName, result);
