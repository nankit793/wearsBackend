const {
  generateAccessToken,
  generateRefreshToken,
} = require("./generateTokens");

const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const attachCokiesToRes = (res, payload) => {
  const accessTokenJWT = generateAccessToken({ payload });
  const refreshTokenJWT = generateRefreshToken({ payload });

  const oneDay = 1000 * 60 * 60;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + longerExp),
  });
};

module.exports = {
  generateOTP,
  attachCokiesToRes,
};
