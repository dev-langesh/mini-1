const { adminData } = require("../data");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

async function loadAdmin() {
  const admin = await User.findOne({ email: "admin@gmail.com" });

  if (!admin) {
    const data = { ...adminData };

    data.password = await bcrypt.hash(data.password, 10);

    await User.create(data);
  }
}

module.exports = { loadAdmin };
