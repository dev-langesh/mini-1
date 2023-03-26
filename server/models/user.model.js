const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  student_id: { type: String, required: true, unique: true },
  phone: { type: Number, unique: true, required: true },
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
  food_code: String,
  verified_account: { type: Boolean, default: false },
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
