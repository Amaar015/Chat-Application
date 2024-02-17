const filterObj = (obj, ...allowedFilled) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFilled.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

module.exports = filterObj;
