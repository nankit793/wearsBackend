const jwt = require("jsonwebtoken");

const generateAccessToken = async (payload) => {
  try {
    const options = {
      expiresIn: `1h`,
    };
    const authToken = await jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      options
    );
    return authToken;
  } catch (error) {
    return null;
  }
};
const generateRefreshToken = async (payload) => {
  try {
    const options = {
      expiresIn: `1h`,
    };
    const authToken = await jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      options
    );
    return authToken;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
