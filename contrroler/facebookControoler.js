// const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModel");

function init(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FBAPPID,
        clientSecret: process.env.FBAPPSECRET,
        callbackURL: "http://localhost:3000/fb/auth",
        profileFields: [
          "id",
          "displayName",
          "name",
          "gender",
          "email",
          "picture.type(large)",
        ],
      },
      async function (accessToken, refreshToken, profile, done) {
       
        // Login
        // Check if id exist in db
        const user = await User.findOne({ id: profile.id });
        console.log(user);
        if (user) {
          return done(null, user);
        }

        const newUser = await User({
          id: profile.id,
          name: profile.displayName,
          email: profile.email,
          pic: profile.photos[0].value,
        });

        await newUser.save();
        return done(null, newUser);
      }
    )
  );
  // This method store user id in session after sucessfully logged in
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    // when we do req.user we get login user the user
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
