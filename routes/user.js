const express = require("express");
const passport = require("passport");
const User = require("../db/models/user");
require("../db/models/book");

const router = new express.Router();

router.post("/users/signin", passport.authenticate("local"), (req, res) => {
	res.status(200).send({
		success: "success",
		data: req.user
	});
});

router.post("/users/create", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).send({
			success: "success",
			data: user
		});
	} catch (err) {
		res.status(400).send({
			success: "fail",
			data: {
				message: error.message
			}
		});
	}
});

router.get("/books", async (req, res) => {
	try {
		if (req.isAuthenticated()) {
			await req.user.populate("institution").execPopulate();
			await req.user.institution.populate("books").execPopulate();

			res.send({
				success: "success",
				data: {
					books: req.user.institution.books
				}
			});
		} else {
			res.status(401).send({
				success: "fail",
				data: {
					message: "Please sign in"
				}
			});
		}
	} catch (error) {
		res.status(500).send({
			success: "error",
			data: {
				error
			}
		});
	}
});

module.exports = router;
