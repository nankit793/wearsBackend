const itemRequired = (name, res) => {
  res.statusCode = 401;
  return `${name}: required entity`;
};

const itemsRequired = (name, res) => {
  res.statusCode = 401;
  return `${name}: required entities`;
};

const itemNotValid = (name, res) => {
  res.statusCode = 400;
  return `${name} is not valid`;
};

const itemsNotValid = (name, res) => {
  res.statusCode = 400;
  return `${name}: may not be valid`;
};

const userAlreadyExists = (res) => {
  res.statusCode = 403;
  return `user already exists`;
};

const userNotExist = (res) => {
  res.statusCode = 404;
  return `User does not exist`;
};

const serverError = (message, res) => {
  res.statusCode = 400;
  return message ? message : `Server Error, Try again later`;
};
module.exports = {
  itemRequired,
  itemsRequired,
  itemsNotValid,
  itemNotValid,
  userAlreadyExists,
  userNotExist,
  serverError,
};
