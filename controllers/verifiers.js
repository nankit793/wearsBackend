var validator = require("email-validator");
const {
  availableColors,
  availableSizes,
  availableCategories,
} = require("./definedValues");
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

const phoneNumberVerify = (phone) => {
  if (phone.length === 10) {
    return true;
  }
  return false;
};

const productVerification = (product) => {
  try {
    const returnError = (msg) => {
      return { state: false, message: msg || "validation failed" };
    };
    const colorsverify = () => {
      for (let index = 0; index < colors.length; index++) {
        const element = colors[index];
        if (!availableColors.includes(element)) {
          return false;
        }
      }
      return true;
    };
    const sizesVerify = () => {
      for (let index = 0; index < sizes.length; index++) {
        const element = sizes[index];
        if (!availableSizes.includes(element)) {
          return false;
        }
      }
      return true;
    };
    const { name, price, description, tags, category, colors, sizes } = product;
    if (!name || name.length < 5) {
      return returnError("Name should at least be 5 characters long");
    }
    if (!price || price < 300) {
      return returnError("Price should at least be 300");
    }
    if (!description || description.length < 2 || !Array.isArray(description)) {
      return returnError("Enter least 2 paragraphs in description");
    }
    const spacedTags = tags?.split(" ");
    if (!tags || spacedTags.length < 3) {
      return returnError("Enter at least 3 tags");
    }
    if (!category || !availableCategories.includes(category)) {
      return returnError("Category does not belong to store");
    }
    if (!colors || !Array.isArray(colors)) {
      return returnError("Colors Required");
    }
    if (!colorsverify()) {
      return returnError("Given color does not belong to any saved color");
    }
    if (!sizes || !Array.isArray(sizes)) {
      return returnError("Sizes Required");
    }
    if (!sizesVerify()) {
      return returnError("Given Size does not belong to store");
    }
    return { state: true };
  } catch (error) {
    return { state: false };
  }
};

module.exports = {
  emailVerification,
  passwordVerification,
  otpVerification,
  phoneNumberVerify,
  productVerification,
};
