require("dotenv").config();

const app = require("./src/expressLoader");
const hbs = require("./src/hbsLoader");
const path = require("path");
const bcrypt = require("bcrypt");
const users = require("./router/users");

app.use("/users", users);
