const fs = require("fs");

function envSetup() {
	return new Promise((resolve, reject) => {
		fs.access("./.env", err => {
			if (err) {
				const rl = require("readline").createInterface({
					input: process.stdin,
					output: process.stdout
				});
				rl.question(`Database Password: `, input => {
					let password = input;
					rl.close();
					const config = `PORT=3000\nMONGODB_SERVER_URL=mongodb+srv://taskapp:${password}@cluster0-pimyx.mongodb.net/test?retryWrites=true&w=majority`;
					fs.writeFile(".env", config, err => {
						if (err) throw err;
						console.log("Config file generated");

						require("dotenv").config();
						resolve();
					});
				});
			} else {
				require("dotenv").config();
				resolve();
			}
		});
	});
}

module.exports = envSetup;
