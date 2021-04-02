const User = require("../models/userModel");
const passport = require("passport");

const PassportAuthenticate = passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/",
});
module.exports = PassportAuthenticate;
