const responseHandler = (success, code = 400, message = 'valid', data) => ({
  success,
  code,
  message,
  data,
});

const asyncHandler = (fn) => (req, res, next) => Promise
  .resolve(fn(req, res, next))
  .catch((error) => {
    console.log(error);
    responseHandler(false, 500, 'Something went wrong', null);
  });

module.exports = {
  responseHandler,
  asyncHandler,
};
