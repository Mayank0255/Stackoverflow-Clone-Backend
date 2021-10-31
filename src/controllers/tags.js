const helperFunction = require('../helpers/helperFunction');
const service = require('../services/tags.service');

const getTags = (req, res) => {
  try {
    service.retrieveAll((err, data) => {
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
      .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
  }
};

const getSingleTag = (req, res) => {
  try {
    service.retrieveOne(req.params.tagname, (err, data) => {
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
      .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
  }
};

module.exports = tagsController = {
  getTags,
  getSingleTag,
};
