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
	},
	institutions: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Institution" }],
		default: undefined
	}
});

bookSchema.pre("save", async function() {
	const book = this;
});

bookSchema.methods.updateInstitutions = async function(institution) {
	const book = this;
	book.institutions.push(institution);
	try {
		await book.save();
	} catch (err) {
		throw new Erorr(err);
	}
};

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
