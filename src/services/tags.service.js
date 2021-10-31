const repository = require('../repositories/tags.repository');

const retrieveAll = (result) => repository.retrieveAll(result);

const retrieveOne = (tagName, result) => repository.retrieveOne(tagName, result);

module.exports = {
  retrieveAll,
  retrieveOne,
};
