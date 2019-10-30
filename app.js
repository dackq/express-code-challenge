// package dependencies
const glob = require("glob");
const path = require("path");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");

require("dotenv").config();
require("./db/mongoose");
require("./config/passportSetup");
const app = express();

//loading routers
let routers = [];
glob.sync("./routes/*.js").forEach(file => {
	const router = require(path.resolve(file));
	routers.push(router);
});

//middleware stack
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

/* Application Routes*/
for (let router of routers) {
	app.use(router);
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
	return handleError(res, 404, "Page Not Found");
});

module.exports = app;
