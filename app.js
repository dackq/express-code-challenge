const express = require("express");
const passport = require("passport");
require("dotenv").config();
require("./models/db/mongoose");
require("./config/passportSetup");
require("./playground/databaseTesting");
// const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(passport.initialize());
// app.use(userRouter);

module.exports = app;
