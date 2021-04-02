const express = require("express");
const router = express.Router();
const passport = require("passport");
const PassportAuthenticate = require("../passportMiddleware/fbMiddleware");
const LocalAuthentication = require("../passportMiddleware/localMiddleware")
const googleAuthenticaiton = require("../passportMiddleware/googleMiddleware")
const isLoggedIn = require("../middleware/isLoggedIn");
const postRegister=require('../contrroler/registerController')
// const facebook = require('passport-facebook').Strategy
router.get("/", (req, res) => {
  res.render("homepage");
});
// fb
router.get("/fb/auth", PassportAuthenticate);

// GOOGLE
router.get("/google/auth", googleAuthenticaiton);
router.get("/google/auth/callback", passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect:'/'
}));


// lcoal register
router.get("/local/register", (req, res) => {
  res.render('./forms/register')
})
router.post("/local/register", postRegister)

// locla login
router.get('/local/login', (req, res) => {
  res.render('./forms/login')
})

router.post('/local/login',LocalAuthentication)


// profile
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

router.get("/logout", (req, res) => {
  req.logout();

  res.redirect('/')
});

module.exports = router;
