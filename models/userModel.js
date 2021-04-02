const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  id: String,

  email: String,
  name: String,
  password: String,
  pic: String,
});

module.exports = User = mongoose.model("User", userSchema);
