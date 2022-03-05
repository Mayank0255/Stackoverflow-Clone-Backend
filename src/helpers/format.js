const sequelizeResponse = (model, ...params) => {
  const result = {};

  params.forEach((item) => {
    result[item] = model.getDataValue(item);
  });
  return result;
};

module.exports = format = {
  sequelizeResponse,
};
