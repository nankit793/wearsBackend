const { StatusCodes } = require("http-status-codes");

const BadRequestError = (res) => {
  res.statusCode = StatusCodes.BAD_REQUEST;
};

module.exports = BadRequestError;
