const bcryptjs = require("bcryptjs");

const generateHash = async (payload) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(payload, salt);
    return { hashed };
  } catch (error) {
    return {
      hashed: false,
    };
  }
};
const compareHash = async (clientPassword, serverPassword) => {
  try {
    const comapreHashed = await bcryptjs.compare(
      clientPassword,
      serverPassword
    );
    if (comapreHashed) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateHash,
  compareHash,
};
