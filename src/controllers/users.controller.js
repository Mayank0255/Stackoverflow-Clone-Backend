const { validationResult } = require('express-validator');
const helperFunction = require('../helpers/helperFunction');
const { User } = require('../models/users.model');
const service = require('../services/users.service');

const getOneUser = (req, res) => {
  try {
    const { id } = req.params;

    service.retrieveOne(
      id,
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
  }
};

const getAllUsers = (req, res) => {
  try {
    service.retrieveAll(
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    // Register user in the database
    await service.register(new User(req.body), (err, data) => {
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
      .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
  }
};

module.exports = usersController = {
  getOneUser,
  getAllUsers,
  register,
};
