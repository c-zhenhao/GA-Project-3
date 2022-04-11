require("dotenv").config();

const app = require("./src/expressLoader");
const hbs = require("./src/hbsLoader");
const path = require("path");
const bcrypt = require("bcrypt");
const users = require("./controllers/users");
const profile = require("./controllers/profile");

const Users = require("./models/Users");
const seed = require("./models/seed");

app.use("/users", users);
app.use("/profile", profile);

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
    ea.age = Math.floor(Math.random() * 52) + 18;
  }
  await Users.deleteMany({});
  await Users.create(seed, (err, data) => {
    if (err) res.status(400).json({ title: "error", message: "seeding error" });
    else res.json(data);
  });
});

app.get("/seed", async (req, res) => {
  try {
    const data = await Users.find();
    res.json(data);
  } catch (err) {
    res.status(400).json({ title: "error", message: "unable to complete request" });
  }
});
