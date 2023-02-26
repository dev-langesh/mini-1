const { Food } = require("../../models/food.model");
const { User } = require("../../models/user.model");

// PUT /food/open-registeration
async function openFoodRegisteration(req, res) {
  try {
    if (!req.user || req.user.role !== "admin") {
      throw new Error("Invalid credentials");
    }

    const update = { open_choices: req.body.open_choices, date: req.body.date };

    const food = await Food.findOneAndUpdate(
      {},
      { $set: update },
      { new: true }
    );

    if (!food) {
      await Food.create(update);
    }

    console.log(food);

    return res.json({ message: "opened registeration" });
  } catch (err) {
    return res.json({ error: err.message });
  }
}

module.exports = { openFoodRegisteration };
