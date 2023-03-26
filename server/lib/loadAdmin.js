const { adminData } = require("../data");
const { User } = require("../models/user.model");

async function loadAdmin() {
  const admin = await User.findOne({ email: "admin@gmail.com" });

  if (!admin) {
    await User.create(adminData);
  }
}

module.exports = { loadAdmin };
