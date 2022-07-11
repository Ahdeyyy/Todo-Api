const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const session = require("express-session");
require("dotenv").config();
const passport = require("passport");
const { createUser  } =  require("./task");

/*  Google AUTH  */
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env["CLIENT_ID"];
const GOOGLE_CLIENT_SECRET = process.env["SECRET"];
const port = process.env.PORT || 3000;
var userProfile;
var loggedOn = false;

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/success");
  }
);
app.get("/success", (req, res) => {
    createUser(userProfile.id,userProfile.displayName,res);
    loggedOn = true;
    // res.redirect('/');
});
app.get("/error", (req, res) => res.send("error logging in"));

app.listen(port, function () {
  console.log(`Listening on port ${port} \nvisit: http://localhost:${port}`);
});

function isLogged(){
  return loggedOn;
}

exports.app = app;
exports.isLogged = isLogged;
