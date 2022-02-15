const responseHandler = require('../helpers/responseHandler');

module.exports = (req, res, next) => {
  const { username } = req.body;

  pool.query(
    `SELECT * FROM users WHERE username = ?;`,
    username,
    (err, results) => {
      if (err) {
        return res
          .status(err.statusCode)
          .json(
            responseHandler(
              false,
              err.statusCode,
              err.message,
              null,
            ),
          );
      }
      if (results[0]) {
        return res
          .status(400)
          .json(
            responseHandler(
              false,
              400,
              'User already exists',
              null,
            ),
          );
      }
      next();
    },
  );
};
