require("dotenv").config();
require("../../db/mongoose");
const User = require("../../db/models/user");
const Book = require("../../db/models/book");
const Institution = require("../../db/models/institution");

const clearDb = async () => {
	await User.deleteMany();
	await Institution.deleteMany();
	await Book.deleteMany();
};

const createNewUser = async body => {
	try {
		const user = new User(body);
		await user.save();
	} catch (err) {
		console.log(err);
	}
};

const createNewInstitution = async body => {
	try {
		const institution = new Institution(body);
		await institution.save();
	} catch (err) {
		console.log(err);
	}
};

const createNewBook = async body => {
	try {
		const institution = await Institution.findOne({
			name: body.owner
		});
		if (!institution._id) {
			throw new Error("Unkown Institution");
		}
		body.owner = institution._id;
		const book = new Book(body);
		await book.save();
	} catch (err) {
		console.log(err);
	}
};

const dbInit = async data => {
	await clearDb();

	for (let key of Object.keys(data.institutions)) {
		await createNewInstitution(data.institutions[key]);
	}

	for (let key of Object.keys(data.books)) {
		await createNewBook(data.books[key]);
	}
};

module.exports = {
	dbInit,
	createNewBook,
	createNewInstitution,
	createNewUser,
	clearDb
};
