const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  open_choices: { type: Boolean, default: false },
  veg: [String],
  non_veg: [String],
  date: String,
  session: String,
});

const Food = mongoose.model("food", foodSchema);

module.exports = { Food };
