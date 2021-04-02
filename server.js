require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const ejsLayouts = require("express-ejs-layouts");
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const MongoDbStore = require("connect-mongo");
// show routes
app.use(morgan("dev"));
// DB
require("./database/db");

// init sesseion
app.use(
  session({
    secret: "someSecret",
    resave: false,
    //TO STORE SESSION IN DB
    store: MongoDbStore.create({ mongoUrl: process.env.MONGO_URL }),
    collection: "sessions",
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    },
  })
);

// passport authentication
const passportInit = require("./contrroler/facebookControoler");
const localInit = require("./contrroler/localController");
const googleInit = require("./contrroler/googleControoler");
googleInit(passport)
passportInit(passport);
localInit(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(ejsLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Guest MIDDLEWARE

// ROUTES
app.use("/", require("./routes/route"));

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
