const jwt = require('jsonwebtoken');
const config = require('config');
const { responseHandler } = require('../helpers/responseHelpers');

const getJwtToken = (payload, logMessage, result) => {
  jwt.sign(
    payload,
    config.get('jwtSecret'),
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
