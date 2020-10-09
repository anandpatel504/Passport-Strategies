const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "anand" }));
app.use(cors());


// googleOauth
const googleOauth = express.Router()
app.use("/", googleOauth)
require("./strategy/googleOauth")(googleOauth, passport)

// passport-facebook
const passportFacebook = express.Router()
app.use("/", passportFacebook)
require("./strategy/passportFacebook")(passportFacebook, passport)

// linkedinOauth
const linkedinOauth = express.Router()
app.use("/", linkedinOauth)
require("./strategy/linkedinOauth")(linkedinOauth, passport)

// githubOauth
const githubOauth = express.Router()
app.use("/", githubOauth)
require("./strategy/githubOauth")(githubOauth, passport)

// login
const login = express.Router()
app.use("/", login);
require("./controllers/login")(login)

const PORT = process.env.PORT || 2020

// The PORT listener
app.listen(PORT, function(){
    console.log(`Server is running on ${PORT} PORT`);
});