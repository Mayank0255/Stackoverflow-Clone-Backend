const jwt = require('jsonwebtoken');
const config = require('../config');
const { responseHandler } = require('./handlers');

const getJwtToken = (payload, logMessage, result) => {
  jwt.sign(
    payload,
    config.JWT.SECRET,
    { expiresIn: 3600 },
    (error, token) => {
      if (error) {
        console.log('error: ', error);
        result(
          responseHandler(
            false,
            error.statusCode,
            error.message,
            null,
          ),
          null,
        );
        return;
      }
      result(
        null,
        responseHandler(true, 200, logMessage, { token }),
      );
    },
  );
};

module.exports = getJwtToken;