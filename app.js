const glob = require("glob");
const path = require("path");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
require("./db/mongoose");
require("./config/passportSetup");

let routers = [];
glob.sync("./routes/*.js").forEach(file => {
	const router = require(path.resolve(file));
	routers.push(router);
});

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

for (let router of routers) {
	app.use(router);
}

module.exports = app;
