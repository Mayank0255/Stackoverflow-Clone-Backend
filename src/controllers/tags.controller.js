const { responseHandler, asyncHandler } = require('../helpers/responseHelpers');
const service = require('../services/tags.service');

exports.getTags = asyncHandler(async (req, res) => {
  try {
    await service.retrieveAll((err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.getSingleTag = asyncHandler(async (req, res) => {
  try {
    await service.retrieveOne(req.params.tagname, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});
