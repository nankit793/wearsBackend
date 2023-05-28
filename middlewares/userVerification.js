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
    const refreshToken = req.headers.refreshtoken;
    if (validate) {
      const { username } = req.body;
      const verifyRefresh = await verifyRefreshTokens(refreshToken);
      if (
        verifyRefresh &&
        verifyRefresh.verified &&
        verifyRefresh.verifyToken
      ) {
        const user = await USERS.findOne({ username });
        if (
          user &&
          user.accountVerfication &&
          verifyRefresh.verifyToken.payload &&
          verifyRefresh.verifyToken.payload.username === user.username
        ) {
          req.user = user;
          return next();
        }
        return res
          .status(401)
          .json({ message: "Access restricted", redirect: true });
      }
      return res
        .status(401)
        .json({ message: "verification failed", redirect: true });
    }
    return res;
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
};

const basicValidation = (req, res) => {
  const { username } = req.body;
  const refreshToken = req.headers.refreshtoken;
  if (!username) {
    res.json({
      message: itemRequired("username", res),
      redirect: true,
    });
    return false;
  }
  if (!emailVerification(username)) {
    res.json({
      message: itemNotValid("username", res),
      redirect: true,
    });
    return false;
  }
  if (!refreshToken) {
    res.json({
      message: itemRequired("token", res),
      redirect: true,
    });
    return false;
  }
  return true;
};

module.exports = userVerification;
