const jwt = require('jsonwebtoken');
const config = require('config');
const { responseHandler } = require('../helpers/responseHelpers');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json(responseHandler(false, 401, 'Sign-in required', null));
  }

  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res
          .status(400)
          .json(responseHandler(false, 400, 'Try again', null));
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error(`error: ${err}`);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
};
