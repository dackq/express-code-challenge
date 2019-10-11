const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const Institution = require("./institution");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		lowercase: true,
		async validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
			if (
				!(await Institution.findOne({
					emailDomain: value.split("@")[1]
				}))
			) {
				throw new Error("Unknown Institution");
			}
		}
	},
	role: {
		type: String,
		trim: true,
		required: true,
		validate(value) {
			if (
				value !== "student" &&
				value !== "administrator" &&
				value !== "academic"
			) {
				throw new Error("Unknown Role");
			}
		}
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	institution: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Institution"
	}
});

userSchema.pre("save", async function(next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	const relatedInstitution = await Institution.findOne({
		emailDomain: user.email.split("@")[1]
	});
	user.institution = relatedInstitution._id;

	next();
});

userSchema.methods.validPassword = async function(password) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
