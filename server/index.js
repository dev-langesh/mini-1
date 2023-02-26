const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDb } = require("./lib/mongoose");
const { userRouter } = require("./routes/auth/user.route");

dotenv.config();

connectDb();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

// routes

app.use("/auth", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
