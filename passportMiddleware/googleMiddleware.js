const User = require("../models/userModel");
const passport = require("passport");

const googelAuthentiation = passport.authenticate("google", {scope:['email','profile']
});
module.exports = googelAuthentiation;
