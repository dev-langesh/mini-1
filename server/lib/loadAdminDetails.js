const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

async function loadAdminDetails() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      verified_account: true,
    });

    console.log("admin details loaded");
  } catch (err) {}
}

module.exports = { loadAdminDetails };
