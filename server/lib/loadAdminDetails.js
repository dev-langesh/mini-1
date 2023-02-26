const { User } = require("../models/user.model");

async function loadAdminDetails() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    await User.create({
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      verified_account: true,
    });

    console.log("admin details loaded");
  } catch (err) {}
}

module.exports = { loadAdminDetails };
