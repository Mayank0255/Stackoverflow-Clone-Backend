const JWT = require('jsonwebtoken');
const config = require('../config');
const { responseHandler } = require('./handlers');

const getJwtToken = (payload, logMessage, result) => {
  JWT.sign(
    payload,
    config.JWT.SECRET,
    { expiresIn: new Date().setDate(new Date().getDate() + config.JWT.EXPIRES_IN) },
    (error, token) => {
      if (error) {
        console.log('error: ', error);
        return result(responseHandler(false, error.statusCode, error.message, null), null);
      }

      return result(null, responseHandler(true, 200, logMessage, { token }));
    },
  );
};

module.exports = getJwtToken;
