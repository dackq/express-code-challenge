require("dotenv").config();
require("../db/mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const Institution = require("../db/models/institution");
const controller = require("./fixtures/dbController");
const data = require("./fixtures/testData.json");
const app = require("../app");

beforeAll(async () => {
	await controller.dbInit(data);
});

test("User can be created", async () => {
	const res = await request(app)
		.post("/users/create")
		.send(data.users.preloadedUser)
		.expect(201);
	expect(res.body.success).toBe("success");
	expect(res.body.data.name).toBe(data.users.preloadedUser.name);
	expect(res.body.data.email).toBe(data.users.preloadedUser.email);
	expect(res.body.data.role).toBe(data.users.preloadedUser.role);

	//find related institution to preloaded user
	const institution = await Institution.findOne({
		emailDomain: data.users.preloadedUser.email.split("@")[1]
	});
	/* test that calculated institution on the user is the same 
	as the calculated institution on the preloaded user */
	expect(String(res.body.data.institution)).toBe(String(institution._id));
	//test that hashed password matches the preloaded user's password
	expect(
		await bcrypt.compare(
			data.users.preloadedUser.password,
			res.body.data.password
		)
	).toBe(true);
});

test("User can sign in", async () => {
	const res = await request(app)
		.post("/users/signin")
		.send(data.users.preloadedUser)
		.expect(200);
	expect(res.body.success).toBe("success");
	expect(res.body.data.name).toBe(data.users.preloadedUser.name);
	expect(res.body.data.email).toBe(data.users.preloadedUser.email);
	expect(res.body.data.role).toBe(data.users.preloadedUser.role);

	//find related institution to preloaded user
	const institution = await Institution.findOne({
		emailDomain: data.users.preloadedUser.email.split("@")[1]
	});
	/* test that calculated institution on the user is the same 
	as the calculated institution on the preloaded user */
	expect(String(res.body.data.institution)).toBe(String(institution._id));
	//test that hashed password matches the preloaded user's password
	expect(
		await bcrypt.compare(
			data.users.preloadedUser.password,
			res.body.data.password
		)
	).toBe(true);
});
