const jwt = require("jsonwebtoken");
const verifyAccessToken = async (accessToken) => {
  try {
    const verifyToken = await jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    return { verified: true, verifyToken, generateNew: false };
  } catch (error) {
    if (error.message === "jwt expired") {
      return { verified: false, generateNew: true };
    }
    return { verified: false, generateNew: false };
  }
};
const verifyRefreshTokens = async (refreshToken) => {
  try {
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    return { verified: true, verifyToken, generateNew: false };
  } catch (error) {
    if (error.message === "jwt expired") {
      return { verified: false, generateNew: true };
    }
    return { verified: false, generateNew: false };
  }
};

module.exports = {
  verifyAccessToken,
  verifyRefreshTokens,
};
