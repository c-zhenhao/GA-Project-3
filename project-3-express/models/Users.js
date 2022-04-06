const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, //hash
});
const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;
