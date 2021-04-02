const User = require("../models/userModel");

const postRegistration = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.send("enter all details");
  }
  // check email in db
  User.exists({ email: email }, async (err, result) => {
    if (result) {
      return res.redirect("/local/register");
    }

    const user = await new User({
      id: req.body.id,
      email: email,
      password: password,
      name: name,
    });

    await user.save();
    return res.redirect("/local/login");
  });
};

module.exports = postRegistration;
