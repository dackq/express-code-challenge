const app = require("../app");
const request = require("supertest");

test("Can access server", async () => {
	const res = await request(app).get("/");
	expect(res.text).toBe("Hey hey hey");
});

test("can sign in", async () => {
	await request(app)
		.post("/users/signin")
		.send({
			email: "susan@wikipodia.org",
			password: "omgiamsoboring"
		})
		.expect(200);
});

test("incorrect credentials cannot sign in", async () => {
	await request(app)
		.post("/users/signin")
		.send({ email: "susan@wikipodia.org", password: "omgiamsoborin" })
		.expect(401);
});

test("persistent session", async () => {
	const res = await request(app)
		.post("/users/signin")
		.send({ email: "susan@wikipodia.org", password: "omgiamsoboring" });
	console.log(res.text);
});
