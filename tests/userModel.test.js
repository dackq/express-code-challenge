require("dotenv").config();
require("../db/mongoose");
const User = require("../db/models/user");
const Institution = require("../db/models/institution");
const Book = require("../db/models/book");
const data = require("./fixtures/testData.json");

test("password is hashed", async () => {
	const user = await User.findOne({ email: "susan@wikipodia.org" });
	expect(user.password).not.toBe(data.users.preloadedUser.password);
});
test("correct student user can be saved", async () => {
	const user = new User(data.users.correctStudent);
	await expect(user.save()).resolves.toBe(user);
});
test("correct academic user can be saved", async () => {
	const user = new User(data.users.correctAcademic);
	await expect(user.save()).resolves.toBe(user);
});
test("correct administrator user can be saved", async () => {
	const user = new User(data.users.correctAdministrator);
	await expect(user.save()).resolves.toBe(user);
});
test("incorrect email domain user cannot be saved", async () => {
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
	const user = new User(data.users.preloadedUser);
	await expect(user.save()).rejects.toThrow(
		"E11000 duplicate key error collection"
	);
});
test("password can be verified", async () => {
	const user = await User.findOne({ email: "susan@wikipodia.org" });
	expect(await User.validPassword(data.users.preloadedUser.password)).toBe(
		true
	);
});
