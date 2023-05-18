const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDb } = require("./lib/mongoose");
const { userRouter } = require("./routes/auth/user.route");
const { loadAdminDetails } = require("./lib/loadAdminDetails");
const { foodRouter } = require("./routes/food/food.route");
const { loadAdmin } = require("./lib/loadAdmin");

dotenv.config();

connectDb();

loadAdmin();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

// load admin details
loadAdminDetails();

// routes
app.use("/auth", userRouter);
app.use("/food", foodRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);

const { Server } = require("socket.io");
const { Food } = require("./models/food.model");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("user is connected");

  socket.on("token", async (code) => {
    console.log(code);

    const veg = await Food.findOne({ veg: code });
    const non_veg = await Food.findOne({ non_veg: code });

    let meal;

    if (veg) meal = "veg";
    else if (non_veg) meal = "non_veg";
    else meal = "Invalid Token";

    io.emit("token", meal);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
