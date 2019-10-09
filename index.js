const express = require("express");
const envSetup = require("./config/envSetup");

const app = express();

envSetup().then(() => {
	const index = require("./routes/index.js");

	app.get("/", index);

	app.listen(process.env.PORT, () =>
		console.log(
			`Open http://localhost:${process.env.PORT} to see a response.`
		)
	);
});
