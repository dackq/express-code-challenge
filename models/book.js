const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
	ISBN: {
		type: String,
		trim: true,
		required: true
	},
	title: {
		type: String,
		trim: true,
		required: true
	},
	author: {
		type: String,
		trim: true,
		required: true
	}
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
