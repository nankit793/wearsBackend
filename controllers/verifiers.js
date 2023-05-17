var validator = require("email-validator");

const emailVerification = (username) => {
  return validator.validate(username);
};

const passwordVerification = (password) => {
  if (password.length >= 6) {
    return true;
  }
  return false;
};

const otpVerification = (otp) => {
  if (otp.length === 4) {
    return true;
  }
  return false;
};

module.exports = { emailVerification, passwordVerification, otpVerification };
