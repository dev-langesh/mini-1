const { generateCode } = require("../../lib/generateCode");
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

// PUT /food/choose-food-item
async function chooseFoodItem(req, res) {
  try {
    const { food_item } = req.body;

    const code = generateCode();

    const user = await User.findById(req.user.userId).select("food_code");

    const food = await Food.find({
      $or: [
        { veg: { $in: [user.food_code] } },
        { non_veg: { $in: [user.food_code] } },
      ],
    });

    if (food.length !== 0) {
      return res.json({ error: "Already choosed" });
    }

    if (food_item === "veg") {
      const food = await Food.findOneAndUpdate(
        {},
        { $push: { veg: code } },
        { new: true }
      );

      console.log(food);
    } else if (food_item === "non_veg") {
      const food = await Food.findOneAndUpdate(
        {},
        { $push: { non_veg: code } },
        { new: true }
      );
      console.log(food);
    }

    user.food_code = code;

    user.save();

    res.json({ user });
  } catch (err) {
    return res.json({ error: err.message });
  }
}

module.exports = { openFoodRegisteration, chooseFoodItem };
