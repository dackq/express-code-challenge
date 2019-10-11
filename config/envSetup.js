const fs = require("fs");
const crypto = require("crypto");

fs.access("./.env", err => {
	if (err) {
		const rl = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout
		});
		rl.question(`Database URL: `, input => {
			let databaseURL = input;
			rl.close();
			const secret = crypto.randomBytes(20).toString("hex");
			const config = `PORT=3000\nMONGODB_SERVER_URL=${databaseURL}\nSESSION_SECRET=${secret}`;
			fs.writeFile(".env", config, err => {
				if (err) throw err;
				console.log("Config file generated");
			});
		});
	}
});
