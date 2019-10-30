const mongoose = require("mongoose");

// Declare institution schema
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

/* Virtul connection to books that are linked with this instititution */
institutionSchema.virtual("books", {
	ref: "Book",
	localField: "_id",
	foreignField: "owner"
});

/**
 * Mongoose Institutions Model
 * @class Institution
 * @property {string} Name
 * @property {string} URL
 * @property {string} EmailDomain
 * @property {virtual} Books Virtul connection to books that are linked with this instititution
 */
const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;
