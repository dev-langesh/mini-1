const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../../lib/verificationEmail");
const { User } = require("../../models/user.model");
const { generateCode } = require("../../lib/generateCode");

// POST /auth/register
async function register(req, res) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const code = generateCode();

    // Create a new user
    await User.create({
      email: req.body.email,
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
    res.status(500).json({ error: "Internal server error" });
  }
}

// POST /auth/login
async function login(req, res) {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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
      { id: user._id, role: user.userType },
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
