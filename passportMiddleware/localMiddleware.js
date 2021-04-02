const User = require("../models/userModel");
const passport = require("passport");

const LocalAuthentication = passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/",
});
module.exports = LocalAuthentication;
