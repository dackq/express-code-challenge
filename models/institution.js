const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	url: {
		type: String,
		trim: true,
		required: true
	},
	emailDomain: {
		type: String,
		trim: true,
		required: true
	}
});

institutionSchema.virtual("books", {
	ref: "Book",
	localField: "_id",
	foreignField: "owner"
});

const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;
