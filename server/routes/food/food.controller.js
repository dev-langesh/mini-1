const { generateCode } = require("../../lib/generateCode");
const { Food } = require("../../models/food.model");
const { User } = require("../../models/user.model");
const xl = require("excel4node");
const path = require("path");
const fs = require("fs");
const { sendMail } = require("../../lib/verificationEmail");

// GET /food
async function getAllRecords(req, res) {
  try {
    const food = await Food.findOne({});
    const user_count = await User.find({}).count();

    if (food) {
      const registered_count = food.non_veg.length + food.veg.length;

      // console.log(user_count, food.non_veg.length);

      console.log(food);

      return res.json({ food, user_count, registered_count });
    }

    return res.json({});
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

    const update = {
      open_choices: true,
      veg: [],
      non_veg: [],
      date: req.body.date,
      session: req.body.session,
    };

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

    sendMail(
      "langesh705@gmail.com",
      "Get Hostel Food Token",
      "Admin opened the portel to get your Food Token"
    );

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

    console.log(food_item);

    const code = generateCode();

    console.log(req.user);

    const user = await User.findById(req.user.userId);

    console.log(user);

    const food = await Food.find({});

    if (!food[0].open_choices) {
      return res.json({ error: "Registeration closed" });
    }

    if (user.food_code) {
      const isAlreadyChoosen = await Food.find({
        $or: [
          { veg: { $in: [user.food_code] } },
          { non_veg: { $in: [user.food_code] } },
        ],
      });

      console.log(await Food.find({}));

      console.log(isAlreadyChoosen);

      if (isAlreadyChoosen.length !== 0) {
        return res.json({ error: "Already choosed" });
      }
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

// GET /food/code
async function getFoodCode(req, res) {
  try {
    const user = await User.findById(req.user.userId);

    console.log(user);

    if (!user) {
      throw new Error("user not found");
    }

    if (user.food_code) {
      const isAlreadyChoosen = await Food.find({
        $or: [
          { veg: { $in: [user.food_code] } },
          { non_veg: { $in: [user.food_code] } },
        ],
      });

      if (isAlreadyChoosen.length !== 0) {
        return res.json(user);
      }
    }

    return res.json({ error: "code not found" });
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

async function generateReport(req, res) {
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet("Sheet 1");

  // Create a reusable style
  var style = wb.createStyle({
    font: {
      color: "#FF0800",
      size: 12,
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });

  const users = await User.find({ role: "user" }).select("-password");

  const food = await Food.findOne({});

  const veg = food.veg;
  const non_veg = food.non_veg;

  const columns = [
    "name",
    "roll_no",
    "email",
    "phone",
    "food_code",
    "meal",
    "date",
    "session",
  ];

  columns.forEach((val, i) => {
    ws.cell(1, i + 1)
      .string(val)
      .style(style);
  });

  users.forEach(async (student, r_no) => {
    const studentCol = [];

    let meal;

    if (veg.includes(student.food_code)) meal = "veg";
    else meal = "non_veg";

    studentCol.push(
      student.name,
      student.student_id,
      student.email,
      student.phone,
      student.food_code,
      meal,
      food.date,
      food.session
    );

    console.log(studentCol);

    let c_no = 1;

    studentCol.forEach((val) => {
      if (typeof val === "number") {
        ws.cell(r_no + 2, c_no).number(val);
      } else {
        ws.cell(r_no + 2, c_no).string(val);
      }
      c_no++;
    });
  });

  const filePath = path.join(__dirname, "..", "..", "public", `report.xlsx`);

  const isExists = fs.existsSync(filePath);

  if (isExists) {
    fs.rmSync(filePath);
  }

  wb.write(filePath);

  res.json({ message: "report generated" });
}

async function validateToken(req, res) {
  try {
    const { code } = req.body;

    console.log(code);

    const veg = await Food.findOne({ veg: code });
    const non_veg = await Food.findOne({ non_veg: code });

    if (veg) return res.json({ meal: "veg" });
    else if (non_veg) return res.json({ meal: "non_veg" });
    else throw new Error("Invalid token");
  } catch (err) {
    if (err) res.json({ error: err.message });
  }
}

module.exports = {
  openFoodRegisteration,
  chooseFoodItem,
  closeFoodRegisteration,
  getAllRecords,
  getFoodCode,
  validateToken,
  generateReport,
};
