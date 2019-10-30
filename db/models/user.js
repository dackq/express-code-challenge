const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const Institution = require("./institution");

//declare user schema
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

// Hash password before saving and determine related institution
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

/**
 *	@memberof User
 * 	@alias User.validPassword
 *	@static
 *	@description Determines if a given password matches the hashed password in the
 database. Used by passport to determine authorization.
 *  @param {string} password Password string to be compared with hashed value in database.
 * 	@return {boolean}
 */
userSchema.statics.validPassword = async function(password) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};

/**
 * Mongoose Users Model
 * @class User
 * @property {string} Name
 * @property {string} Email Validated as a valid email. Email domain name is validated against institutions which can be found in the database. If there is not a match, user is not accepted.
 * @property {string} Role Validated against list of posible roles ('student', 'administrator', 'academic')
 * @property {string} Password String value is replaced with a bcrypt hashed value before being saved to the database.
 * @property {mongoose.ObjectId} Institution Link to the user's related institution. Determined implicitly based on the domain name.
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
