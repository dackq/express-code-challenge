const fs = require("fs");

fs.access("./.env", err => {
	if (err) {
		const rl = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout
		});
		rl.question(`Database URL: `, input => {
			let databaseURL = input;
			rl.close();
			const config = `PORT=3000\nMONGODB_SERVER_URL=${databaseURL}`;
			fs.writeFile(".env", config, err => {
				if (err) throw err;
				console.log("Config file generated");
			});
		});
	}
});
