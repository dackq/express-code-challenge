const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
require("./models/db/mongoose");
require("./config/passportSetup");
const userRouter = require("./routes/user");

const app = express();

app.use(
	session({
		secret: "cats" /* will change */,
		resave: false,
		saveUninitialized: false
	})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);

module.exports = app;
