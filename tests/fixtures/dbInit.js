const User = require("../../models/user");
const Institution = require("../../models/institution");
const Book = require("../../models/book");
const data = require("../testData.json");

const dbInit = async () => {
	try {
		await Institution.deleteMany();
		await User.deleteMany();
		await Book.deleteMany();
	} catch (err) {
		console.log(err.message);
	}
	for (let key of Object.keys(data.institutions)) {
		try {
			let institution = new Institution(data.institutions[key]);
			await institution.save();
		} catch (err) {
			console.log(err.message);
		}
	}
	for (let key of Object.keys(data.books)) {
		try {
			let book = new Book(data.books[key]);
			await book.save();
		} catch (err) {
			console.log(err.message);
		}
	}
	try {
		let user = new User(data.users.preloadedUser);
		await user.save();
	} catch (err) {
		console.log(err.message);
	}
};

const clearDb = async () => {
	await Institution.deleteMany();
	await User.deleteMany();
	await Book.deleteMany();
};
module.exports = { dbInit, clearDb };
