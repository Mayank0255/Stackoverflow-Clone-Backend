exports.responseHandler = (success, code = 400, message = 'valid', data) => ({
  success,
  code,
  message,
  data,
});
