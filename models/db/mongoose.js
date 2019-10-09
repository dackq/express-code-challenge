const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_SERVER_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});
