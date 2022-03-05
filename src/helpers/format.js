const sequelizeResponse = (model, ...params) => {
  const result = {};

  params.forEach((item) => {
    result[item] = model.getDataValue(item);
  });
  return result;
};

const mergeById = (arr1, arr2) => arr1.map((itemOne) => ({
  ...arr2.find((itemTwo) => (itemTwo.id === itemOne.id) && itemTwo),
  ...itemOne,
}));

module.exports = format = {
  sequelizeResponse,
  mergeById,
};
