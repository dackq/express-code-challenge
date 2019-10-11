const mongoose = require("mongoose");
const User = require("./user");

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
	},
	books: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
		default: undefined
	}
});

institutionSchema.pre("save", async function() {});

institutionSchema.virtual("users", {
	ref: "User",
	localField: "_id",
	foreignField: "institution"
});

// institutionSchema.methods.updateUsers = async function() {
// 	const users = await User.find({ institution: this._id });
// 	console.log(users);
// };

const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;
