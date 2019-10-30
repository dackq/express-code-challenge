const mongoose = require("mongoose");

//declare book schema
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
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Institution"
	}
});

/**
 * Mongoose Book Model
 * @class Book
 * @property {string} ISBN
 * @property {string} Title
 * @property {string} Author
 * @property {mongoose.ObjectId} owner Link to the institution who owns this book.
 */
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
