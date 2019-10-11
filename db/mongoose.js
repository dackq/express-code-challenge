const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGODB_SERVER_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

module.exports = db;
