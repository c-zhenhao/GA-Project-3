require("dotenv").config();

const app = require("./src/expressLoader");
const hbs = require("./src/hbsLoader");
const path = require("path");
const bcrypt = require("bcrypt");
const users = require("./controllers/users");

const Users = require("./models/Users");
const seed = require("./models/seed");

app.use("/users", users);

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const randStr = (len) => {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

app.post("/seed", async (req, res) => {
  for (let ea of seed) {
    ea.passwordHash = await bcrypt.hash("password", 12);
  }
  await Users.deleteMany({});
  await Users.create(seed, (err, data) => {
    console.log(err);
    if (err) res.status(400).json({ status: "error", message: "seeding error" });
    else res.json(data);
  });
});

app.get("/seed", async (req, res) => {
  try {
    const data = await Users.find();
    res.json(data);
  } catch (err) {
    res.status(400).json({ status: "error", message: "unable to complete request" });
  }
});
