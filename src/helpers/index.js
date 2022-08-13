const investApi = require('./investApi');
const getJwtToken = require('./jwt');
const response = require('./handlers');

module.exports = {
  investApi,
  getJwtToken,
  ...response,
};
