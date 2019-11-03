// package dependencies
const glob = require("glob");
const path = require("path");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");

require("./db/mongoose");
require("./config/passportSetup");
const app = express();

// loading routers
let routers = [];
glob.sync("./routes/*.js").forEach(file => {
	const router = require(path.resolve(file));
	routers.push(router);
});

// middleware stack
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

/* Application Routers */
for (let router of routers) {
	app.use(router);
}

app.use("/docs", express.static("./docs"));

module.exports = app;
