const GoogleStatergy = require("passport-google-oauth2").Strategy;
const User = require("../models/userModel");
function init(passport) {
  passport.use(
    new GoogleStatergy(
      {
        clientID: process.env.GOOGLEAPPID,
        clientSecret: process.env.GOOGLESECRET,
        callbackURL: "http://localhost:3000/google/auth/callback",
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        // // check if email exist in db
        const user = await User.findOne({ email: profile.email });
        if (user) {
          return done(null, user);
        }
        const newUser = await User({
          id: profile.id,
          email: profile.email,
          name: profile.name.givenName + "" + profile.name.familyName,
          pic: profile.picture,
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
