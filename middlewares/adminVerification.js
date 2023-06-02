const { attachCokiesToRes } = require("@controllers/general");
const { verifyRefreshTokens } = require("@controllers/verifyTokens");
const USERS = require("@models/user/UserSchema");
const {
  itemRequired,
  itemNotValid,
  serverError,
  userNotExist,
} = require("@errors/general");
const { emailVerification } = require("@controllers/verifiers");

const userVerification = async (req, res, next) => {
  try {
    const validate = basicValidation(req, res);
    next();
  } catch {}
};

const basicValidation = (req, res) => {
  return true;
};

module.exports = userVerification;
