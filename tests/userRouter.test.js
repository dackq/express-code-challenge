require("dotenv").config();
require("../db/mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const Institution = require("../db/models/institution");
const controller = require("./fixtures/dbController");
const data = require("./fixtures/testData.json");
const app = require("../app");

const agent = request.agent(app);

beforeAll(async () => {
	await controller.dbInit(data);
});

describe("Preloaded User Test", () => {
	it("creates user from valid user credentials", async () => {
		const res = await agent
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

	it("signs in user", async () => {
		const res = await agent
			.post("/users/signin")
			.send({
				email: data.users.preloadedUser.email,
				password: data.users.preloadedUser.password
			})
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

	it("returns books associated with user", async () => {
		const res = await agent.get("/books").expect(200);

		expect(res.body.success).toBe("success");
		expect(res.body.data.books.length).toBe(2);
		expect(String(res.body.data.books.map(book => book.title))).toBe(
			"A History of Hipsters in Utah,Mathmatical Foundations of Bread Baking"
		);

		//test that only books that belong to the user's institution are returned
		const institution = await Institution.findOne({
			emailDomain: data.users.preloadedUser.email.split("@")[1]
		});
		expect(
			res.body.data.books.every(
				book => String(book.owner) === String(institution._id)
			)
		).toBe(true);
	});
});

describe("Fail Tests", () => {
	it("does not sign up user with unknown email domain", async () => {
		const res = await agent
			.post("/users/create")
			.send(data.users.unknownEmailDomain)
			.expect(400);

		expect(res.body.success).toBe("fail");
		expect(res.body.data.message).toBe(
			"User validation failed: email: Unknown Institution"
		);
	});
	it("does not sign up user with missing name", async () => {
		const res = await agent
			.post("/users/create")
			.send(data.users.noName)
			.expect(400);

		expect(res.body.success).toBe("fail");
		expect(res.body.data.message).toBe(
			"User validation failed: name: Path `name` is required."
		);
	});
	it("does not sign up user with missing email", async () => {
		const res = await agent
			.post("/users/create")
			.send(data.users.noEmail)
			.expect(400);

		expect(res.body.success).toBe("fail");
		expect(res.body.data.message).toBe(
			"User validation failed: email: Path `email` is required."
		);
	});
});
