const express = require("express");
require("dotenv").config();
require("./models/db/mongoose");
require("./playground/databaseTesting");

const app = express();

app.use(express.json());

const index = require("./routes/index.js");

app.get("/", index);

app.listen(process.env.PORT, () =>
	console.log(`Open http://localhost:${process.env.PORT} to see a response.`)
);
