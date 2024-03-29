const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../../lib/verificationEmail");
const { User } = require("../../models/user.model");
const { generateCode } = require("../../lib/generateCode");

// POST /auth/register
async function register(req, res) {
  try {
    const { name, student_id, email, password, phone } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const code = generateCode();

    // Create a new user
    await User.create({
      name,
      student_id,
      phone,
      email: email,
      password: hashedPassword,
      verification_code: code,
    });

    sendMail({
      to: req.body.email,
      subject: "Verification code",
      text: `Your verification code is ${code}`,
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
}

// POST /auth/login
async function login(req, res) {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    console.log(user);

    if (!user) {
      return res.json({ error: "Invalid email or password" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.json({ error: "Invalid email or password" });
    }

    if (!user.verified_account) {
      return res.json({
        message: "Account not verified",
        redirect: "verify_code",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
}

// PUT /auth/verify-code
async function verifyCode(req, res) {
  try {
    const code = req.body.code;
    const email = req.body.email;

    if (!code || !email) {
      throw new Error("Fill all the credentials");
    }

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { verified_account: true } }
    );

    if (user.verification_code != code) {
      throw new Error("Invalid code");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.userType },
      process.env.JWT_SECRET
    );

    return res.json({
      message: "Code Verified",
      token,
      role: user.role,
    });
  } catch (err) {
    return res.json({ error: err.message, stack: err.stack });
  }
}

module.exports = { register, login, verifyCode };
