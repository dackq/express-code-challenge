require("dotenv").config();
require("../models/db/mongoose");
const User = require("../models/user");
const Institution = require("../models/institution");
const Book = require("../models/book");
const data = require("./testData.json");

beforeAll(async () => {
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
});

test("Correct student user can be saved", async () => {
	const user = new User(data.users.correctStudent);
	await expect(user.save()).resolves.toBe(user);
});
test("Correct academic user can be saved", async () => {
	const user = new User(data.users.correctAcademic);
	await expect(user.save()).resolves.toBe(user);
});
test("Correct administrator user can be saved", async () => {
	const user = new User(data.users.correctAdministrator);
	await expect(user.save()).resolves.toBe(user);
});
test("Incorrect email domain user cannot be saved", async () => {
	const user = new User(data.users.unknownEmailDomain);
	await expect(user.save()).rejects.toThrow("Unknown Institution");
});
test("Incorrect role cannot be saved", async () => {
	const user = new User(data.users.unknownRole);
	await expect(user.save()).rejects.toThrow("Unknown Role");
});
test("incorrect email and role cannot be saved", async () => {
	const user = new User(data.users.unknownRoleAndEmailDomain);
	await expect(user.save()).rejects.toThrow(
		"Unknown Role" && "Unknown Institution"
	);
});
test("user with no name cannot be saved", async () => {
	const user = new User(data.users.noName);
	await expect(user.save()).rejects.toThrow("Path `name` is required.");
});
test("user with no email cannot be saved", async () => {
	const user = new User(data.users.noEmail);
	await expect(user.save()).rejects.toThrow("Path `email` is required.");
});
test("user with no role cannot be saved", async () => {
	const user = new User(data.users.noRole);
	await expect(user.save()).rejects.toThrow("Path `role` is required.");
});
test("user with no password cannot be saved", async () => {
	const user = new User(data.users.noPassword);
	await expect(user.save()).rejects.toThrow("Path `password` is required.");
});
test("email must be unique", async () => {
	const user = new User(data.users.correctStudent);
	await expect(user.save()).rejects.toThrow(
		"E11000 duplicate key error collection"
	);
});
