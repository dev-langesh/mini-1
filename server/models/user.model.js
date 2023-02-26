const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verification_code: String,
  verified_account: { type: Boolean, default: false },
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
