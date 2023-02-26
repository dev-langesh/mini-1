const { generateCode } = require("../../lib/generateCode");
const { Food } = require("../../models/food.model");
const { User } = require("../../models/user.model");

// GET /food
async function getAllRecords(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Invalid credentials");
    }

    const food = await Food.find({});

    return res.json(food);
  } catch (err) {
    return res.json({ error: err.message });
  }
}

// PUT /food/open-registeration
async function openFoodRegisteration(req, res) {
  try {
    if (!req.user || req.user.role !== "admin") {
      throw new Error("Invalid credentials");
    }

    const update = { open_choices: true, date: req.body.date };

    const food = await Food.findOneAndUpdate(
      {},
      { $set: update },
      { new: true }
    );

    if (!food) {
      await Food.create(update);
    }

    return res.json({ message: "opened registeration" });
  } catch (err) {
    return res.json({ error: err.message });
  }
}

// PUT /food/close-registeration
async function closeFoodRegisteration(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Invalid credentials");
    }

    const update = { open_choices: false, veg: [], non_veg: [] };

    const food = await Food.findOneAndUpdate(
      {},
      { $set: update },
      { new: true }
    );

    return res.json({ message: "Registeration closed" });
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

    const food = await Food.find({});

    if (!food[0].open_choices) {
      return res.json({ error: "Registeration closed" });
    }

    const isAlreadyChoosen = await Food.find({
      $or: [
        { veg: { $in: [user.food_code] } },
        { non_veg: { $in: [user.food_code] } },
      ],
    });

    if (isAlreadyChoosen.length !== 0) {
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

module.exports = {
  openFoodRegisteration,
  chooseFoodItem,
  closeFoodRegisteration,
  getAllRecords,
};
